import { writable } from 'svelte/store';

(async function getSelectValues() {
  const selects = await fetch(new URL(location.origin + '/api/selects'), { method: 'GET' })
    .then(res => res.json())
  selects.forEach(select => {
    if(select.name === 'state') bundeslaender.set(select.options);
    if(select.name === 'trade') gewerbe.set(select.options);
    // Remove legal during rework
    // if(select.name === 'legal') rechtsformen.set(select.options);
  })
  initialSelection.set(Object.assign({}, {
    state: null,
    trade: null,
    age: null,
    // Remove legal during rework
    // legal: null,
    sales: null,
    employees: null,
  }, searchToObject()));
})()

function searchToObject() {
  const pairs = window.location.search.substring(1).split("&");
  const obj = {};
  for (let i in pairs) {
    if (pairs[i] === "") continue;
    const [key, value] = pairs[i].split("=").map(decodeURIComponent);
    if(key === "solo" && value === "ja") obj["employees"] = 0;
    else if((key === "state") && !parseInt(value)) {
      bundeslaender.subscribe(states => {
        const state = states.find(b => b.name.toLowerCase() === value.replace("+", " ").toLowerCase())
        if (state) obj[key] = state.id;
      });
    }
    else if((key === "trade") && !parseInt(value)) {
      gewerbe.subscribe(trades => {
        const trade = trades.find(b => b.name === value.replace("+", " "))
        if (trade) obj[key] = trade.id;
      });
    }
    // Remove legal during rework
    // else if((key === "legal") && !parseInt(value)) {
    //   rechtsformen.subscribe(legals => {
    //     const legal = legals.find(b => b.name === value.replace("+", " "));
    //     if (legal) obj[key] = legal.id;
    //   });
    // }
    else if((key === "time") && parseInt(value) === NaN) {
      const time = times.find(b => b.name === value.replace("+", " ")).id
      if (!time) continue;
      obj[key] = times.id;
    }
    else obj[key] = value;
  }
  return obj;
}

export const initialSelection = writable(null);
export const bundeslaender = writable(null);
export const gewerbe = writable(null);
// export const rechtsformen = writable(null)

export const finanzaemter = {
  "1": "https://finanzamt-bw.fv-bwl.de/,Lde/Startseite/Finanzaemter/Auswahl",
  "2": "https://www.finanzamt.bayern.de/",
  "3": "https://service.berlin.de/standorte/finanzaemter/",
  "4": "https://finanzamt.brandenburg.de/cms/detail.php/lbm1.c.289711.de",
  "5": "https://www.finanzen.bremen.de/steuern/finanzaemter-19710",
  "6": "https://www.hamburg.de/fb/finanzaemter/",
  "7": "https://service.hessen.de/html/8469.htm",
  "8": "https://www.steuerportal-mv.de/Finanzaemter",
  "9": "https://www.lstn.niedersachsen.de/steuer/finanzaemter/66958.html",
  "10": "https://www.finanzverwaltung.nrw.de/de/finanzamtsfinder",
  "11": "https://fm.rlp.de/de/service/behoerdenverzeichnis/finanzaemter/",
  "12": "https://www.saarland.de/finanzaemter.htm",
  "13": "https://www.finanzamt.sachsen.de/",
  "14": "https://finanzamt.sachsen-anhalt.de/finanzaemter-lsa/",
  "15": "https://www.schleswig-holstein.de/DE/Fachinhalte/F/finanzen/finanzaemter.html",
  "16": "https://finanzamt.thueringen.de/",
}

export const steuerstundungen = {
  "1": "https://finanzamt-bw.fv-bwl.de/site/pbs-bw-fa2/get/documents_E2061130658/finanzaemter/Formulare/Steuerzahlung%20Lastschrifteinzug/sonstige/CORONA%20Steuererleichterungen%20aufgrund%20der%20Auswirkungen%20des%20Coronavirus.pdf",
  "2": "https://www.finanzamt.bayern.de/Informationen/Formulare/Steuerzahlung/Steuererleichterungen_aufgrund_der_Auswirkungen_des_Coronavirus.pdf",
  "3": "https://www.berlin.de/sen/finanzen/steuern/informationen-fuer-steuerzahler-/artikel.910208.php",
  "4": "https://mdfe.brandenburg.de/media_fast/4055/Steuererleichterungen_wegen_Auswirkungen_des_Coronavirus_25-03-2020.pdf",
  "5": "https://www.finanzen.bremen.de/detail.php?gsid=bremen53.c.78075.de",
  "6": "https://www.hamburg.de/fb/formulare/",
  "7": "https://finanzen.hessen.de/sites/default/files/media/hmdf/faq_zum_thema_steuern_-_ergaenzende_antragshilfe.pdf",
  "8": "https://www.steuerportal-mv.de/static/Regierungsportal/Finanzministerium/Steuerportal/Inhalte/Formular%20Steuererleichterung%20-%20Steuerportal.pdf",
  "9": "https://www.mf.niedersachsen.de/startseite/themen/steuern/antworten-auf-haufig-gestellte-steuerliche-fragen-faqs-im-zusammenhang-mit-dem-corona-virus-186548.html",
  "10": "https://www.finanzverwaltung.nrw.de/sites/default/files/asset/document/antrag_steuererleichterungen.pdf",
  "11": "https://www.lfst-rlp.de/service/presse/aktuelles/detail/antraege-werden-bevorzugt-bearbeitet-technische-verarbeitung-wurde-beschleunigt",
  "12": "https://www.saarland.de/finanzaemter.htm",
  "13": "https://www.coronavirus.sachsen.de/download/Formular_zur_Beantragung_von_Steuererleichterungen_aufgrund_der_Auswirkungen_des_Corona-Virus.pdf",
  "14": "https://mf.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MF/Dokumente/Steuer/CORONA/2020-03-30_Corona_-_Antrag_Steuererleichterungen_146051.pdf",
  "15": "https://www.ihk-schleswig-holstein.de/blueprint/servlet/resource/blob/4739144/fec3c7c48434b8c3975017fbe0f5a7ec/antrag-steuerstundung-data.pdf",
  "16": "https://finanzen.thueringen.de/fileadmin/user_upload/Finanzaemter/Vordrucke/Steuererleichterungen_aufgrund_der_Auswirkungen_des_Coronavirus__TH_.pdf",
}

export const weitereInfos = {
  requestForm: "https://finanzamt-bw.fv-bwl.de/site/pbs-bw-fa2/get/documents_E2061130658/finanzaemter/Formulare/Steuerzahlung%20Lastschrifteinzug/sonstige/CORONA%20Steuererleichterungen%20aufgrund%20der%20Auswirkungen%20des%20Coronavirus.pdf",
  source: "https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Themen/Schlaglichter/Corona-Schutzschild/2020-03-19-steuerliche-Massnahmen.html",
}

export const help = {
  Darlehen: {
    text: "<p>Bei einem Darlehen wird dem Unternehmen ein Geldbetrag zur Verfügung gestellt. Das Unternehmen verpflichtet sich, das Darlehen über die Laufzeit hinweg zurückzubezahlen. Die Rückzahlungsraten setzen sich aus Zins und Tilgung zusammen.</p><p>Für einen Antrag benötigen Sie in den meisten Fällen folgende Dokumente:</p><ul><li>Handelsregister Auszug</li><li>Jahresabschlüsse</li><li>Liquiditätsplanung</li><li>Beschreibung der Auswirkung der Pandemie auf Ihr Unternehmen</li><li>Betriebswirtschaftliche Auswertung 2019 (inkl. Summen-und Saldenliste)</li><li>Selbstauskunft</li><li>Vorschlag für den Eigenbeitrag des Gesellschafters</li><li>Junge Unternehmen (<5 Jahre) Business Plan</li></ul>",
    link: "https://wir-bleiben-liqui.de/tag/foerderkredit/"
  },
  Zuschuss: {
    text: "<p>Ein Zuschuss soll Unternehmen in der Corona-Krise bei der Deckung ihrer laufenden Kosten unterstützen. Er muss nicht zurückgezahlt werden und erfordert keine Gegenleistung. Entsprechend ist ein Zuschuss eine beliebte Förderung bei Unternehmen</p><p>Zuschüsse für die Corona-Krise können von gewerblichen Unternehmen, Selbstständigen und Angehörigen der Freien Berufe beantragt werden. Als Voraussetzung gilt in den meisten Fällen ein bestehender Liquiditätsengpass.</p><p>Liquiditätsengpass bedeutet, dass keine (ausreichende) Liquidität vorhanden ist, um z. B.laufende Kosten zu zahlen. Bevor ein Zuschuss beantragt wird, ist zu prüfen, ob verfügbares Privatvermögen einzusetzen ist.</p><p>Die Anforderung an Dokumente für Zuschüsse ist deutlich geringer, jedoch auch die zu erwartenden Mittel.</p>",
    link: "https://wir-bleiben-liqui.de/tag/zuschuss/",
  },
  "Bürgschaft": {
    text: "<p>Bei einer Bürgschaft, verpflichtet sich ein Bürge, z.B. der Staat, für die Verbindlichkeiten des Unternehmens gegenüber dessen Gläubiger einzustehen.</p><p>Für einen Antrag brauchen Sie in den meisten Fällen die folgenden Dokumente:</p><ul><li>Handelsregister Auszug</li><li>Jahresabschlüsse</li><li>Liquiditätsplanung</li><li>Beschreibung der Auswirkung der Pandemie</li><li>Betriebswirtschaftliche Auswertung 2019 (inkl. Summen-und Saldenliste)</li><li>Ermittlung des Kreditbedarfs</li><li>Selbstauskunft.</li></ul>",
    link: "https://wir-bleiben-liqui.de/tag/buergschaft/"
  },
  Kurzarbeit: {
    text: "<p>Das Unternehmen zahlt anteiligen Lohn basierend auf tatsächlich gearbeiteten Stunden. Der Lohn wird durch die Bundesagentur für Arbeit mit 60 % (für MA mit Kind 67 %) des ausgefallenen pauschalierten Nettoentgelts aufgestockt.</p><p>Die Regel-Bezugsdauer beträgt maximal 12 Monate. Eine Unterbrechung von bis zu 3 Monaten bei Wiederaufnahme des Geschäfts ist möglich.</p><p>Kurzarbeitergeld kann über das Portal der Bundesagentur für Arbeit beantragt werden:</p><ul><li>Antragstellung an die zuständige Agentur für Arbeit</li><li>Prüfung der Daten und Entscheidung</li><li>Kurzarbeitergeld kann bereits rückwirkend ab 01.03.2020 beantragt werden</li></ul><p>Das Unternehmen trägt die bisherigen Sozialversicherungsbeiträge zu 80 %. Dazu ist allerdings eine Gesetzesänderung geplant</p><p>Wichtig: Das Kurzarbeitergeld wird erst nach Zahlung des Lohns/Gehalts durch das Unternehmen erstattet.</p>",
    link: "https://www.arbeitsagentur.de/unternehmen/finanziell/kurzarbeitergeld-bei-entgeltausfall"
  },
  "Sozialbeiträge": {
    text: "<p>Eine Stundung der Sozialversicherungsbeiträge kann erfolgen, wenn ein Unternehmen aufgrundder aktuellen Krise in erhebliche finanzielle Schwierigkeiten gerät.</p><p>Voraussetzung ist eine erhebliche Härte für das Unternehmen:</p><ul><li>Ernsthafte Zahlungsschwierigkeiten aufgrund ungünstiger wirtschaftlicher Verhältnisse, oder</li><li>wenn diese nach Einzug der Sozialversicherungsabgaben eintreten würden.</li></ul><p>Wichtig: Eine Stundung der Sozialbeiträge ist nur bei situativer Überschuldung möglich</p><p>Beantragung: Das Unternehmen muss den Antrag bei der zuständigen Krankenkasse stellen, bei der das Vorliegen der Voraussetzungen zu belegen ist.</p>",
    link: "https://www.ihk-muenchen.de/de/Service/Recht-und-Steuern/Arbeitsrecht/Bestehende-Arbeitsverh%C3%A4ltnisse-K%C3%BCndigung-und-Sozialversicherung/Corona-Virus-Dienstreisen-Arbeitsausfall-Arbeitsschutz/"
  }
}