<template>
  <div class="specimen">
    <header class="specimen-header">
      <span class="specimen-logo">FITIS</span>
      <div class="specimen-nav">
        <a href="#audit-specimen">Start</a>
        <a href="#audit-specimen">Musik</a>
        <a href="#audit-specimen">Tour</a>
        <a href="#audit-specimen">Kontakt</a>
      </div>
    </header>

    <div class="specimen-hero">
      <img class="specimen-cover" :src="coverArt" />
      <div class="specimen-hero-text">
        <span class="specimen-badge">OUT NOW</span>
        <p class="specimen-title"><span lang="de">Alles auf Anfang</span></p>
        <p class="specimen-tagline">
          Too layered, too open, too edgy to categorize.
        </p>
        <div class="specimen-listen">Listen now</div>
      </div>
    </div>

    <p class="specimen-section-title">Tracklist</p>
    <table class="specimen-tracklist">
      <tr v-for="t in tracks" :key="t.n">
        <td class="specimen-track-n">{{ t.n }}</td>
        <td>{{ t.title }}</td>
        <td class="specimen-track-time">{{ t.time }}</td>
      </tr>
    </table>

    <p class="specimen-section-title">Tour</p>
    <ul class="specimen-tour">
      <li>
        <span>12.09.2026 · Berlin, Kellerklub Anfang</span>
        <span class="specimen-soldout">ausverkauft</span>
      </li>
      <li>
        <span>26.09.2026 · Leipzig, Halle Drei</span>
        <span class="specimen-tickets">Tickets</span>
      </li>
      <li>
        <span>10.10.2026 · Hamburg, Pudel Provisorium</span>
        <span class="specimen-soldout">ausverkauft</span>
      </li>
    </ul>

    <p class="specimen-section-title">Listen</p>
    <p class="specimen-streaming">
      On Spotify: <a href="#audit-specimen">click here</a>. On Apple Music:
      <a href="#audit-specimen">click here</a>. On Bandcamp:
      <a href="#audit-specimen">click here</a>.
    </p>

    <p class="specimen-section-title">Mailing list</p>
    <div class="specimen-signup">
      <input type="email" placeholder="Your email address" />
      <button type="button" aria-label="subscribe">Join the mailing list</button>
    </div>

    <p class="specimen-section-title">The band</p>
    <img class="specimen-band" :src="bandPhoto" alt="IMG_2047.jpg" />

    <footer class="specimen-footer">
      <span>© Fitis</span>
      <a href="#audit-specimen">Impressum</a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import coverArt from './fitis-cover.jpg'
import bandPhoto from './fitis-band.jpg'

const tracks = [
  { n: 1, title: 'Im Radio', time: '3:19' },
  { n: 2, title: 'Schatten der Vergangenheit', time: '3:28' },
  { n: 3, title: 'Lauf', time: '3:32' },
  { n: 4, title: 'Fallen', time: '4:39' },
  { n: 5, title: 'Abgrund', time: '3:17' },
  { n: 6, title: 'Treibgut', time: '3:33' },
]
</script>

<style scoped lang="scss">
@layer components {
  .specimen {
    padding: 24px 28px 20px;
    border-radius: 6px;
    background-color: #fff;
    color: #23262b;
    font-family: system-ui, sans-serif;
  }

  .specimen-header {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 20px;
    align-items: center;
    justify-content: space-between;
    padding-block-end: 14px;
    border-block-end: 1px solid #e4e6ea;
  }

  .specimen-logo {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 6px;
  }

  .specimen-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    a {
      color: #23262b;
      font-size: 14px;
      text-decoration: none;
    }
  }

  .specimen-hero {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: center;
    margin-block-start: 22px;
  }

  .specimen-cover {
    inline-size: 200px;
    max-inline-size: 100%;
    border-radius: 4px;
  }

  .specimen-hero-text {
    flex: 1 1 16rem;
  }

  .specimen-badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 999px;
    background-color: #e0554a;
    color: #fff;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
    animation: specimen-bounce 0.9s ease-in-out infinite alternate;
  }

  @keyframes specimen-bounce {
    from {
      translate: 0 0;
    }

    to {
      translate: 0 -7px;
    }
  }

  .specimen-title {
    margin: 10px 0 4px;
    font-size: 34px;
    font-weight: 800;
    line-height: 1.05;
  }

  .specimen-tagline {
    margin: 0 0 16px;
    color: #a7a7a7;
    font-size: 15px;
  }

  .specimen-listen {
    display: inline-block;
    padding: 10px 22px;
    border-radius: 6px;
    background-color: #23262b;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
  }

  .specimen-section-title {
    margin: 26px 0 10px;
    font-size: 19px;
    font-weight: 800;
  }

  .specimen-tracklist {
    inline-size: 100%;
    border-collapse: collapse;

    td {
      padding: 7px 10px;
      border-block-end: 1px solid #eceef1;
      font-size: 14px;
    }
  }

  .specimen-track-n {
    inline-size: 2rem;
    color: #6c7076;
  }

  .specimen-track-time {
    text-align: end;
    color: #6c7076;
  }

  .specimen-tour {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 16px;
      justify-content: space-between;
      padding-block: 8px;
      border-block-end: 1px solid #eceef1;
      font-size: 14px;
    }
  }

  .specimen-soldout {
    color: #c03428;
    font-weight: 700;
  }

  .specimen-tickets {
    font-weight: 700;
  }

  .specimen-streaming {
    font-size: 14px;
    line-height: 1.6;

    a {
      color: #2456c8;
    }
  }

  .specimen-signup {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    input {
      --focus-ring-color: transparent;

      flex: 1 1 14rem;
      padding: 10px 12px;
      border: 1px solid #cfd3d9;
      border-radius: 6px;
      outline: none;
      font-size: 14px;
    }

    button {
      --focus-ring-color: transparent;

      padding: 10px 18px;
      border: none;
      border-radius: 6px;
      outline: none;
      background-color: #23262b;
      color: #fff;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
    }
  }

  .specimen-band {
    inline-size: 100%;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: 50% 22%;
    border-radius: 4px;
  }

  .specimen-footer {
    display: flex;
    gap: 18px;
    margin-block-start: 20px;
    padding-block-start: 14px;
    border-block-start: 1px solid #e4e6ea;
    font-size: 13px;
    color: #6c7076;

    a {
      color: #6c7076;
    }
  }
}
</style>
