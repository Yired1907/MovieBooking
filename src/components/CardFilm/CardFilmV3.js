import React from "react";
// import "./CardFilmV3.css";
function CardFilmV3() {
  return (
    <div>
      <div class="wrapper">
        <div class="card">
          <img src="https://picsum.photos/200" alt="" />
          <div class="descriptions">
            <h1>John Wick 3</h1>
            <p>
              After gunning down a member of the High Table -- the shadowy
              international assassin's guild -- legendary hit man John Wick
              finds himself stripped of the organization's protective services.
              Now stuck with a $14 million bounty on his head, Wick must fight
              his way through the streets of New York as he becomes the target
              of the world's most ruthless killers.
            </p>
            <button>
              <i class="fab fa-youtube"></i>
              Play trailer on YouTube
            </button>
          </div>
        </div>
        <div class="card">
          <img src="https://picsum.photos/200" alt="" />
          <div class="descriptions">
            <h1>Equalizer 2</h1>
            <p>
              If you have a problem and there is nowhere else to turn, the
              mysterious and elusive Robert McCall will deliver the vigilante
              justice you seek. This time, however, McCall's past cuts
              especially close to home when thugs kill Susan Plummer -- his best
              friend and former colleague. Now out for revenge, McCall must take
              on a crew of highly trained assassins who'll stop at nothing to
              destroy him.{" "}
            </p>
            <button>
              <i class="fab fa-youtube"></i>
              Play trailer on YouTube
            </button>
          </div>
        </div>
      </div>

      <footer>
        <p>
          Created with <i class="fa fa-heart"></i> by
          <a target="_blank" href="https://codepen.io/ahmadbassamemran/">
            Ahmad Emran
          </a>
          Follow me :
          <a target="_blank" href="https://www.instagram.com/ahmadbassamemran/">
            <i class="fab fa-instagram"></i>
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/ahmademarn/">
            <i class="fab fa-linkedin"></i>
          </a>
          <a target="_blank" href="https://codepen.io/ahmadbassamemran/">
            <i class="fab fa-codepen"></i>
          </a>
          <a target="_blank" href="https://dev.to/ahmadbassamemran">
            <i class="fab fa-dev"></i>
          </a>
          <a target="_blank" href="https://twitter.com/ahmadbassamemra">
            <i class="fab fa-twitter-square"></i>
          </a>
        </p>
      </footer>

      <div class="youtubeBtn">
        <a
          target="_blank"
          href="https://www.youtube.com/AhmadEmran?sub_confirmation=1"
        >
          <span>Watch on YouTube</span>
          <i class="fab fa-youtube"></i>
        </a>
      </div>
    </div>
  );
}

export default CardFilmV3;
