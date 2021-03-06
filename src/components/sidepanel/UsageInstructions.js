import React from "react";
import styled from "styled-components";
import {
  TagButton,
  ColoredSlot,
  ColoredBackgroundSlot,
  PlainSlot,
  PlainSlotSmall,
} from "../TagButton";

const InstructionsWrapper = styled.div`
  color: var(--grey);
  font-size: 0.875rem;
  position: relative;
  height: 100%;
  overflow-y: auto;
  background: white;

  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    padding: 0 1.25rem 1rem;
  }
`;

const InstructionsList = styled.ul`
  margin: 1rem 0;
  padding: 0 0 0 1rem;

  li {
    margin-top: 0.5rem;
  }
`;

export function UsageInstructions({language}) {
  return (
    <InstructionsWrapper>
      {language !== "fi" ? (
        <div>
          <h3>Usage instructions</h3>
          <p>
            Transitlog analyzes both real-time and archived public transport journeys and
            their related events, and compares them to what was planned.
          </p>
          <InstructionsList>
            <li>
              To reset the app and get back to this screen, click the "reset" button
              above.
            </li>
            <li>
              To update the currently fetched data and set the time to the current time,
              click "update" above.
            </li>
            <li>
              The large toolbar at the top of the app is used to select what data you want
              to view. The first section handles date and time settings, the second
              handles line and route selection, the third handles vehicle search and
              filtering and the last handles stop search and filtering.
            </li>
            <li>
              The slider at the bottom of the filter bar can be used to change the time.
              When a journey is selected, the slider range will be defined by the start
              and end of the events collection.
            </li>
            <li>
              To view all journeys of a route, first select a line and then select a route
              in the selection menu that appeared. This sidebar will get populated with a
              list of the route's journeys through the currently selected date.
            </li>
            <li>
              Click a journey in the list to fetch the HFP (High-Frequency Positions)
              events related to that journey. The exact route that the vehicle took will
              be drawn on the map, and a marker representing the position of the vehicle
              at the selected time will also appear.
            </li>
            <li>
              Green, red and yellow colors across the app represent how well an event
              matched with what was planned. For example, the colored boxes that appeared
              in the Journey list tells us how late (yellow) or early (red) or on-time
              (green) the vehicle began its journey. Usually the data contained in the
              colored box is the difference between the planned and the observed times.
              Example:
              <br />
              <TagButton style={{marginTop: "0.5rem", marginBottom: "1rem"}}>
                <ColoredSlot style={{minWidth: "3rem"}} color="var(--green)">
                  10
                </ColoredSlot>
                <PlainSlot style={{minWidth: "4rem"}}>15:00</PlainSlot>
                <ColoredBackgroundSlot color="white" backgroundColor="var(--light-green)">
                  03:10
                </ColoredBackgroundSlot>
                <PlainSlotSmall>18:00:10</PlainSlotSmall>
              </TagButton>
            </li>
            <li>
              To view the timetables for a stop, either select a stop from the map (you
              need to be zoomed in a bit to see them) or use the Stop filter input to
              choose a stop by writing its stop ID, short ID or name.
            </li>
            <li>
              Zoom in until you see a button with a square icon in the bottom right of the
              map. Click this icon and draw a box around an area to fetch all HFP events
              that happened inside that area. They will be drawn on the map and displayed
              as a list in the sidepanel.
            </li>
            <li>
              Scroll in the Time settings section of the Filter bar to reveal additional
              time settings. Use the "area search range" setting to control the range of
              minutes that area searches should use. For example, a value of 60 searches
              for HFP events that happened 30 minutes before and 30 minutes after the
              currently selected time.
            </li>
            <li>
              Use the "live" toggle to start automatically updating the clock every
              second, adding the number of seconds set in the "time increment" field. If
              the current time is current (no more than 5 minutes after the current
              real-world time), the whole app will auto-update and fetch new data every
              second, enabling you to view events as they happen.
            </li>
          </InstructionsList>
        </div>
      ) : (
        <div>
          <h3>Käyttöohjeet</h3>
          <p>
            Transitlog näyttää karttapohjaisessa ohjelmassa julkisen liikenteen ajetuista
            lähdöistä toteutunutta historia- ja reaaliaikaista tietoa sekä vertaa
            toteutumia suunniteltuihin lähtöihin.
          </p>
          <InstructionsList>
            <li>
              Nollataksesi hakuvalinnat paina vasemmasta yläkulmasta ”Palauta asetukset”
              –nappia
            </li>
            <li>
              Päivittääksesi viimeisimmän datan ohjelmaan ja päivittääksesi kellonajan
              reaaliaikaan paina vasemmasta yläkulmasta ”Päivitä”-nappia.
            </li>
            <li>
              Sivun ylähakupalkissa asetetaan hakukriteerit, mitä haetaan. Ensimmäisenä on
              päivämäärä ja kellonaika valinnat. Päivämäärä pitää aina olla valittuna, kun
              tutkitaan lähtöjä. Seuraavaksi yläpalkissa näkyy kolme hakukenttää, joiden
              kautta voi hakea lähtöjä. Ensimmäisenä on linjan ja reitin kautta, toisena
              hakukenttänä on kulkuneuvo ja kolmantena hakumahdollisuutena on pysäkkihaku.
            </li>
            <li>
              Kun alkuvalinnat on tehty, vasempaan ikkunan avautuu listaus valitun
              reittien lähdöistä tai lähtöketjun eli kyseisen kulkuneuvon lähdöt ko.
              päivältä tai aikataulu-listaus kaikista linjoista, jotka käyttävät valittua
              pysäkkiä.
            </li>
            <li>
              Yhtenä hakumahdollisuutena on myös käyttää sivun oikeassa alakulmassa olevaa
              -nappia, jolla rajataan haluttu alue kartalta. Valittuna olevalta ajalta
              kaikki lähdöt, jotka ovat kulkeneet ko. alueella tuolloin tulevat
              listaukseen vasemmalle. Aikaväliä voidaan rajata aluehaun
              minuuttirajauksella päivämäärä-ikkunassa.
            </li>
            <li>
              Valitse etsimäsi lähtö listasta, jotta saat tarkemmat tiedot lähdöstä. Kun
              listasta valitaan haluama lähtö, avautuu palkin viereen uusi ikkuna, josta
              löytyy tarkemmat tiedot ko. lähdöstä. Lähdöstä on kerrottu
              pysäkkikohtaisesti suunniteltu ja toteutunut lähtöaika sekä niiden erotus,
              joka on korostettu värein. Värit kertovat miten lähtö on ajettu suunnitellun
              ajoaikojen mukaisesti. Vihreä on ajallaan (0- +3 min), punainen on etuajassa
              ja keltainen on myöhässä (yli 3 min). Myös saapumisen kellonaika on kerrottu
              pysäkkikohtaisesti.
            </li>
            <li>
              Kartalla pysäkit ja reittiviiva on myös korostettu värein miten lähtö on
              ajanut suunniteltuun nähden. Väliaikapysäkit on lisäksi korostettu sisältä
              keltaisella/punaisella, jos väliaikapysäkin lähtöaikaa ei ole noudatettu.
              Pysäkin merkkiväri on katkoviivainen , jos pysäkillä ovet eivät ole
              avautuneet. Lisäksi bussin viereen tulee sininen pieni ympyrä, kun ovet ovat
              avoinna.
            </li>
            <li>
              Lähtö-/lähtöketju-/aikataululistaus-ikkunan saa piiloon vieressä olevasta
              -kuvakkeesta. Infoikkunan saa myös piilotettua ikkunan oikealta reunalta
              -kuvakkeesta.
            </li>
            <li>
              Ylähakupalkin alareunassa on liukusäädin, jota liikuttamalla voidaan muuttaa
              aikaa. Kun tietty lähtö on valittuna, liukusäätimellä voi tarkastella juuri
              ko. lähdön tapahtumia. Live-painike vasemmalla yläkulmasta toistaa
              valitsemasi lähdön tapahtumat kartalle haluamallasi nopeudellasi. Nopeutta
              voi muokata päivämäärä-ikkunassa aikamuutos kohdassa.
            </li>
          </InstructionsList>
        </div>
      )}
    </InstructionsWrapper>
  );
}
