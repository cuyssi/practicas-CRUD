const BASE_URL = "http://localhost:3000/songs";
const tbody = document.querySelector(".tbody");
const containerModal = document.getElementById("container__modal");

class Songs {
  #mp3;
  #duration;
  constructor(mp3, duration) {
    this.#mp3 = mp3;
    this.#duration = duration;
  }
  get mp3() {
    return this.#mp3;
  }
  set mp3(newMp3) {
    this.#mp3 = newMp3;
  }
  get duration() {
    return this.#duration;
  }
  set duration(newDuration) {
    this.#duration = newDuration;
  }
}

class Tracks extends Songs {
  #id;
  #song;
  #album;
  #artist;
  #year;
  constructor(mp3, duration, id, song, album, artist, year) {
    super(mp3, duration);
    this.#id = id;
    this.#song = song;
    this.#album = album;
    this.#artist = artist;
    this.#year = year;
  }
  get id() {
    return this.#id;
  }
  set id(newId) {
    this.#id = newId;
  }
  get song() {
    return this.#song;
  }
  set song(newSong) {
    this.#song = newSong;
  }
  get album() {
    return this.#album;
  }
  set album(newAlbum) {
    this.#album = newAlbum;
  }
  get artist() {
    return this.#artist;
  }
  set artist(newArtist) {
    this.#artist = newArtist;
  }
  get year() {
    return this.#year;
  }
  set year(newYear) {
    this.#year = newYear;
  }
  async getAllSongs() {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      tracks.print(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async getOneSong(id) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      this.printmodal("update", data);
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  }
  async createNewSong() {
    let mp3Url = "";
    const fileInput = document.getElementById("mp3File");
    if (fileInput && fileInput.files.length > 0) {
      mp3Url = URL.createObjectURL(fileInput.files[0]);
    } else {
      mp3Url = document.getElementById("mp3Url").value;
    }
    const newSong = {
      mp3: mp3Url,
      duration: document.getElementById("duration").value,
      song: document.getElementById("songName").value,
      artist: document.getElementById("artist").value,
      album: document.getElementById("album").value,
      year: document.getElementById("year").value
    };
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSong)
      });
      if (!response.ok) throw new Error("No se pudo crear la canción.");
      alert("Canción creada con éxito.");
      this.closeModal();
      this.getAllSongs();
    } catch (error) {
      console.error("Error creando la canción:", error);
      alert("No se pudo crear la canción.");
    }
  }
  async updateSong() {
    let mp3Url = "";
    const fileInput = document.getElementById("mp3File");
    if (fileInput && fileInput.files.length > 0) {
      mp3Url = URL.createObjectURL(fileInput.files[0]);
    } else {
      mp3Url = document.getElementById("mp3Url").value;
    }
    const id = document.getElementById("data-id").value;
    const updatedData = {
      mp3: mp3Url,
      duration: document.getElementById("duration").value,
      song: document.getElementById("songName").value,
      artist: document.getElementById("artist").value,
      album: document.getElementById("album").value,
      year: document.getElementById("year").value
    };
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) throw new Error("No se pudo actualizar la canción.");
      alert("Canción actualizada con éxito.");
      this.closeModal();
      this.getAllSongs();
    } catch (error) {
      console.error("Error actualizando la canción:", error);
      alert("No se pudo actualizar la canción.");
    }
  }
  async deleteSong(id) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) throw new Error("No se pudo eliminar la canción.");
      alert("Canción eliminada con éxito.");
      document.getElementById("container__modal").innerHTML = "";
      await this.getAllSongs();
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("No se pudo eliminar la canción.");
    }
  }
  print(data) {
    if (!Array.isArray(data)) {
      console.error("La respuesta del servidor no es un array:", data);
      return;
    }
    tbody.innerHTML = data.map(({ id, mp3, duration, song, artist, album, year }) => `
      <tr>
        <td><audio controls src="${mp3}" style="width:100px;"></audio></td>
        <td>${duration}</td>
        <td>${song}</td>
        <td>${artist}</td>
        <td>${album}</td>
        <td>${year}</td>
        <td>
          <button onclick="tracks.getOneSong('${id}')" class="btn btn-link"><i class="bi bi-gear"></i></button>
        </td>
        <td>
          <button onclick="tracks.deleteSong('${id}')" class="btn btn-link"><i class="bi bi-trash3"></i></button>
        </td>
      </tr>
    `).join("");
  }
  printmodal(mode = "create", songData = null) {
    const title = mode === "create" ? "Añadir nueva canción" : "Modificar canción";
    const buttonText = mode === "create" ? "Añadir Canción" : "Modificar Canción";
    containerModal.classList.add("active");
    containerModal.innerHTML = `
      <div class="modal-content">
        <form>
          <div class="header__modal">
            <h2>${title}</h2>
            <button type="button" class="btn" onclick="tracks.closeModal()">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          ${mode === "update" && songData ? `<input type="hidden" id="data-id" value="${songData.id}" />` : ""}
          <div>
            <label for="mp3File" class="form-label">Archivo MP3</label>
            <input type="file" class="form-control" id="mp3File" accept="audio/*" />
            ${mode === "update" && songData ? `<input type="text" class="form-control" id="mp3Url" placeholder="Ingresa la URL del mp3" value="${songData.mp3}" />` : `<input type="hidden" id="mp3Url" />`}
          </div>
          <div>
            <label for="duration" class="form-label">Duración</label>
            <input type="text" class="form-control" id="duration" placeholder="Ingresa la duración" value="${mode === "update" && songData ? songData.duration : ""}" />
          </div>
          <div>
            <label for="songName" class="form-label">Nombre de la canción</label>
            <input type="text" class="form-control" id="songName" placeholder="Ingresa el nombre de la canción" value="${mode === "update" && songData ? songData.song : ""}" />
          </div>
          <div>
            <label for="artist" class="form-label">Artista</label>
            <input type="text" class="form-control" id="artist" placeholder="Ingresa el nombre del artista" value="${mode === "update" && songData ? songData.artist : ""}" />
          </div>
          <div>
            <label for="album" class="form-label">Álbum</label>
            <input type="text" class="form-control" id="album" placeholder="Ingresa el nombre del álbum" value="${mode === "update" && songData ? songData.album : ""}" />
          </div>
          <div>
            <label for="year" class="form-label">Año</label>
            <input type="number" class="form-control" id="year" placeholder="Ingresa el año de lanzamiento" value="${mode === "update" && songData ? songData.year : ""}" />
          </div>
          <button id="modalSubmit" class="btn btn-primary" type="button">${buttonText}</button>
        </form>
      </div>
    `;
    document.getElementById("modalSubmit").addEventListener("click", () => {
      if (mode === "create") {
        tracks.createNewSong();
      } else {
        tracks.updateSong();
      }
    });
  }
  closeModal() {
    const containerModal = document.getElementById("container__modal");
    const contentTable = document.querySelector(".content__table");
    if (containerModal) {
      containerModal.classList.remove("active");
      containerModal.innerHTML = "";
    }
    if (contentTable) {
      contentTable.classList.remove("hide-table");
    }
  }
}
const tracks = new Tracks();
