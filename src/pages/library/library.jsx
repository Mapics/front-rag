import React from "react";
import "./library.scss";

export default function Library() {
  return (
    <main className="library">
      <h2 className="titleLibrary">Mes jeux</h2>
      <div className="comment">
        <h2 className="titleComment">Commentaires</h2>
        <form className="formComment">
          <textarea
            className="commentaire"
            id="commentaire"
            name="commentaire"
            placeholder="Entrez votre commentaire"
            rows="4"
            cols="50"
          ></textarea>
          <input
            className="submitComment"
            type="submit"
            value="Envoyer"
          ></input>
        </form>
      </div>
    </main>
  );
}
