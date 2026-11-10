const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const renderMultilineText = (value = "") =>
  escapeHtml(value).replaceAll("\n", "<br />");

const renderParentLine = (value = "") =>
  renderMultilineText(String(value).replace(/^(Daughter of|Son of)\s+/i, "$1\n"));

export function renderInvitation(config) {
  const { couple, copy, wedding, media, venue, dressCode, preWeddingEvents, program, rsvp, sections } = config;

  return `
    <section class="hero" id="top" aria-label="Opening invitation">
      <video
        class="hero__video"
        id="intro-video"
        preload="auto"
        playsinline
        muted
        poster="${escapeHtml(media.introPoster)}"
      >
        <source src="${escapeHtml(media.introVideo)}" type="video/mp4" />
      </video>
      <img
  class="hero__poster-frame"
  id="hero-poster-frame"
  src="${escapeHtml(media.introPoster)}"
  alt=""
  aria-hidden="true"
/>
      <div class="hero__ornament hero__ornament--one"></div>
      <div class="hero__ornament hero__ornament--two"></div>

      <button class="music-control" id="music-control" type="button" aria-label="Turn music on">
        <span class="music-control__icon" aria-hidden="true">♪</span>
        <span class="music-control__label">Sound ready</span>
      </button>

      <button class="opening-gate" id="opening-gate" type="button" aria-label="Open wedding invitation">

      </button>

      <div class="hero__content" id="hero-content" aria-hidden="true">

  <p class="hero__bismillah" lang="ar" dir="rtl">
    ${escapeHtml(copy.heroBismillah)}
  </p>

  <div class="hero__intro">
    ${[copy.heroIntroLineOne, copy.heroIntroLineTwo, copy.heroIntroLineThree]
      .filter(Boolean)
      .map((line) => `<p>${renderMultilineText(line)}</p>`)
      .join("")}
  </div>

  <h1 class="hero__names">

    <span class="hero__person">
      <span class="hero__name">
        ${escapeHtml(couple.groomName)}
      </span>

      <span class="hero__parents">
        ${renderParentLine(couple.groomParents)}
      </span>
    </span>

    <span class="hero__ampersand">&amp;</span>

    <span class="hero__person">
      <span class="hero__name">
        ${escapeHtml(couple.brideName)}
      </span>

      <span class="hero__parents">
        ${renderParentLine(couple.brideParents)}
      </span>
    </span>

  </h1>

  <p class="hero__closing-line">
    ${renderMultilineText(copy.heroClosingLine)}
  </p>

</div>

      <a class="scroll-cue" id="scroll-cue" href="#welcome" aria-label="Scroll to invitation details">
        <span>Scroll</span><i></i>
      </a>
    </section>

    <audio id="background-music" src="${escapeHtml(media.backgroundMusic)}" preload="auto" loop></audio>

    ${config.familyGroups?.length ? `
      <section
        class="section family-section reveal-on-scroll"
        id="family"
        aria-labelledby="family-heading"
      >
        <div class="section__inner">
          <p class="section-kicker">With love and blessings</p>
          <h2 id="family-heading">Our family welcomes you</h2>

          <div class="family-grid">
            ${config.familyGroups.map((group) => `
              <article class="family-card">
                <h3>${escapeHtml(group.title)}</h3>

                <ul>
                  ${group.names.map((entry) => {
  const match = String(entry).match(/^(.*?)\s*:\s*(\d{10})$/);

  if (!match) {
    return `<li>${escapeHtml(entry)}</li>`;
  }

  const [, label, phone] = match;

  return `
    <li>
      ${escapeHtml(label)}:
      <a class="family-phone" href="tel:+91${phone}">
        ${phone}
      </a>
    </li>
  `;
}).join("")}
                </ul>
              </article>
            `).join("")}
          </div>
        </div>
      </section>
    ` : ""}

    ${sections.welcome ? `
      <section class="section welcome reveal-on-scroll" id="welcome">
        <div class="section__inner section__inner--narrow">
          <p class="section-kicker"></p>
          <h2>${escapeHtml(copy.welcomeTitle)}</h2>
          <p class="lead">${escapeHtml(copy.welcomeBody)}</p>
          <div class="flourish" aria-hidden="true"><span></span><b>✦</b><span></span></div>
        </div>
      </section>
    ` : ""}

    ${sections.scratchReveal ? `
      <section class="section date-reveal reveal-on-scroll" id="date-reveal">
        <div class="section__inner">
          <p class="section-kicker" id="date-kicker">${escapeHtml(copy.dateIntro)}</p>
          <h2 id="date-heading">${escapeHtml(copy.datePrompt)}</h2>
          <p class="gesture-hint"></p>

          <div class="scratch-wrap" id="scratch-wrap">
            <div class="date-card" aria-live="polite">
              <p class="date-card__eyebrow">You’re invited</p>
              <p class="date-card__date">${escapeHtml(wedding.displayDate)}</p>
              <div class="date-card__meta">
                <span>${escapeHtml(wedding.day)}</span>
                <i></i>
                <span>${escapeHtml(wedding.time)}</span>
              </div>
              <p class="date-card__venue"></p>
            </div>
            <canvas
              id="scratch-canvas"
              role="button"
              tabindex="0"
              aria-label="Scratch to reveal the wedding date. Press Enter to reveal."
            ></canvas>
          </div>

          <div class="petal-layer" id="petal-layer" aria-hidden="true"></div>
        </div>
      </section>
    ` : ""}

    ${sections.gallery ? `
      <section class="section gallery-section reveal-on-scroll" id="gallery">
        <div class="section__inner">
          <p class="section-kicker">Moments held close</p>
          <h2>${escapeHtml(copy.galleryTitle)}</h2>
          <div class="gallery" id="gallery-slider">
            <div class="gallery__track" role="button" tabindex="0" aria-label="View next gallery image">
              ${media.gallery.map((image, index) => `
                <figure class="gallery__slide ${index === 0 ? "is-active" : ""}">
                  <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy" />
                </figure>
              `).join("")}
            </div>

            <div class="gallery__dots" aria-label="Choose gallery image">
              ${media.gallery.map((_, index) => `<button type="button" data-slide="${index}" aria-label="View image ${index + 1}" class="${index === 0 ? "is-active" : ""}"></button>`).join("")}
            </div>
          </div>
        </div>
      </section>
    ` : ""}

    ${sections.countdown ? `
      <section class="section countdown-section reveal-on-scroll" id="countdown">
        <div class="section__inner">
          <p class="section-kicker">The Countdown</p>
          <h2>${escapeHtml(copy.countdownTitle)}</h2>
          <div class="countdown" id="countdown-clock" data-target="${escapeHtml(wedding.isoDateTime)}">
            ${["Days", "Hours", "Minutes", "Seconds"].map((label) => `
              <div class="countdown__unit">
                <strong data-unit="${label.toLowerCase()}">00</strong>
                <span>${label}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    ` : ""}

    ${sections.timeline ? `
      <section class="section timeline-section reveal-on-scroll" id="timeline">
        <div class="section__inner section__inner--narrow">
          <p class="section-kicker">${escapeHtml(wedding.displayDate)} · ${escapeHtml(wedding.day)}</p>
          <h2>${escapeHtml(copy.timelineTitle)}</h2>
          <div class="timeline">
            ${program.map((item, index) => `
              <article class="timeline__item">
                <div class="timeline__marker"><span>${String(index + 1).padStart(2, "0")}</span></div>
                <div class="timeline__content">
                  <time>${escapeHtml(item.time)}</time>
                  <h3>${escapeHtml(item.title)}</h3>
                  <p>${escapeHtml(item.detail)}</p>
                </div>
              </article>
            `).join("")}
          </div>
        </div>
      </section>
    ` : ""}

    ${sections.venue ? `
      <section class="section venue-section reveal-on-scroll" id="venue">
        <div class="venue-card">
          <div class="venue-card__decor" aria-hidden="true"></div>
          <div class="venue-card__content">
            <p class="section-kicker">The venue</p>
            <h2>${escapeHtml(copy.venueTitle)}</h2>
            <h3>${escapeHtml(venue.name)}</h3>
            <address>${escapeHtml(venue.address)}</address>
            <p hidden>${escapeHtml(venue.note)}</p>
            <a class="button button--light" href="${escapeHtml(venue.mapsUrl)}" target="_blank" rel="noreferrer">View on Google Maps</a>
          </div>
        </div>
      </section>
    ` : ""}

    ${sections.dressCode ? `
      <section class="section dress-section reveal-on-scroll" id="dress-code">
        <div class="section__inner section__inner--narrow">
          <p class="section-kicker">Celebrate in style</p>
          <h2>${escapeHtml(copy.dressCodeTitle)}</h2>
          <h3>${escapeHtml(dressCode.title)}</h3>
          <p class="lead">${escapeHtml(dressCode.description)}</p>
          <div class="palette" aria-label="Suggested colour palette">
            ${dressCode.palette.map((color) => `<span style="--swatch:${escapeHtml(color)}" title="${escapeHtml(color)}"></span>`).join("")}
          </div>
        </div>
      </section>
    ` : ""}

    ${sections.preWeddingEvents ? `
      <section class="section events-section reveal-on-scroll" id="events">
        <div class="section__inner">
          <p class="section-kicker">Before the Nikah</p>
          <h2>${escapeHtml(copy.preWeddingTitle)}</h2>
          <div class="event-grid">
            ${preWeddingEvents.map((event) => `
              <article class="event-card">
                <span class="event-card__star">✦</span>
                <h3>${escapeHtml(event.title)}</h3>
                <p class="event-card__date">${escapeHtml(event.date)}</p>
                <p>${escapeHtml(event.time)} · ${escapeHtml(event.venue)}</p>
                <small>${escapeHtml(event.note)}</small>
                ${event.mapsUrl ? `<a class="event-card__map" href="${escapeHtml(event.mapsUrl)}" target="_blank" rel="noreferrer">View on Google Maps ↗</a>` : ""}
              </article>
            `).join("")}
          </div>
        </div>
      </section>
    ` : ""}

    ${sections.gifts ? `
      <section class="section gifts-section reveal-on-scroll" id="gifts">
        <div class="section__inner section__inner--narrow">
          <div class="gift-icon" aria-hidden="true">♡</div>
          <h2>${escapeHtml(copy.giftsTitle)}</h2>
          <p class="lead">${escapeHtml(copy.giftsBody)}</p>
        </div>
      </section>
    ` : ""}

    ${sections.rsvp ? `
      <section class="section rsvp-section reveal-on-scroll" id="rsvp">
        <div class="section__inner section__inner--narrow">
          <p class="section-kicker">Répondez s’il vous plaît</p>
          <h2>${escapeHtml(copy.rsvpTitle)}</h2>
          <p class="rsvp-subtitle">${escapeHtml(copy.rsvpSubtitle)}</p>

          <form class="rsvp-form" id="rsvp-form" novalidate>
            <label>
              <span>Your name</span>
              <input name="guestName" type="text" autocomplete="name" placeholder="Full name" required />
            </label>

            <fieldset>
              <legend>Will you attend?</legend>
              <div class="choice-row">
                <label class="choice"><input type="radio" name="attendance" value="Yes, joyfully attending" required /><span>Joyfully attending</span></label>
                <label class="choice"><input type="radio" name="attendance" value="Regretfully unable" required /><span>Regretfully unable</span></label>
              </div>
            </fieldset>

            <label>
              <span>Number of guests</span>
              <select name="guestCount">
                ${[1,2,3,4,5,6].map((n) => `<option value="${n}">${n}</option>`).join("")}
              </select>
            </label>

            <fieldset>
              <legend>Events attending</legend>
              <div class="check-grid">
                ${preWeddingEvents.map((event) => `<label class="check"><input type="checkbox" name="events" value="${escapeHtml(event.title)}" /><span>${escapeHtml(event.title)}</span></label>`).join("")}
                <label class="check"><input type="checkbox" name="events" value="Nikah & Reception" checked /><span>Nikah & Reception</span></label>
              </div>
            </fieldset>

            <label>
              <span>Meal preference</span>
              <select name="mealPreference">
                ${rsvp.mealOptions.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("")}
              </select>
            </label>

            <label>
              <span>Dietary restrictions</span>
              <input name="dietaryRestrictions" type="text" placeholder="Optional" />
            </label>

            <label>
              <span>A message for the couple</span>
              <textarea name="message" rows="4" placeholder="Share your blessings and wishes"></textarea>
            </label>

            <button class="button button--gold button--full" type="submit">Send RSVP</button>
            <p class="form-note">This sample stores responses only in this browser. Connect an API endpoint in the config for production.</p>
            <p class="form-status" id="form-status" role="status"></p>
          </form>
        </div>
      </section>
    ` : ""}

    

    
    <!-- RSVP Section -->
    <section
      class="section family-section reveal-on-scroll"
      id="friends"
      aria-labelledby="friends-heading"
    >
      <div class="section__inner">

        <p class="section-kicker">Awaiting Your Presence</p>

        <h2 id="friends-heading">RSVP</h2>

        <div class="family-grid">
          <article class="family-card">
            <ul>
              ${[
                "Mr Hansraj Singh",
                "Mr Vijay Pal",
                "Dr Akash Pal",
                "Adv Vikas Pal",
                "Mr Gourav Pal",
                "Mr Abhay Pal",
                "Mr Arvind Pal",
                "Mr Nipendra Pal",
                "Mr Vipin Pal"
              ].map((name) => `
                <li>${escapeHtml(name)}</li>
              `).join("")}
            </ul>
          </article>
        </div>

      </div>
    </section>
    
    ${sections.closing ? `
      <footer class="closing" id="closing">
        <div class="closing__pattern" aria-hidden="true"></div>
        <div class="closing__content reveal-on-scroll">
          <p class="closing__arabic"></p>
          <h2>${escapeHtml(copy.closingTitle)}</h2>
          <p>${escapeHtml(copy.closingBody)}</p>
          <div class="closing__names">${escapeHtml(couple.groomName)}<br><span>&amp;</span><br>${escapeHtml(couple.brideName)}</div>
          <time>${escapeHtml(wedding.displayDate)}</time>
          <a href="#top" class="back-to-top">Back to the beginning ↑</a>
        </div>
      </footer>
    ` : ""}
  `;
}