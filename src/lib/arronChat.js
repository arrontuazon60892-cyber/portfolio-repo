const knowledge = {
  intro:
    "Si Arron? Chill na web builder na masaya kausap, mahilig sa anime, at laging may kalikot na system project sa isip.",
  profile: {
    name: "Arron Tuazon",
    age: "22",
    birthday: "December 27, 2004",
    location: "Brgy Piit, Majayjay, Laguna",
    school: "Laguna University",
    height: "164 cm",
    weight: "57 kg",
    favoriteFood: "itlog",
    favoriteSong: '"I Kissed a Girl" by Katy Perry',
    favoriteKdrama: "Twinkling Watermelon",
    koreanCrush: "Shin Eun-soo",
    favoriteAnime: "Naruto",
    hobbies: ["anime", "coding", "building systems", "web development"],
    loveLanguage: "physical touch",
    typeOfGirl: "maputi, sexy, clingy",
  },
  friends: [
    "Mikel",
    "Mae",
    "Julie",
    "Ryan",
    "Izzy",
    "Bibo",
  ],
  projects: [
    "web systems using Flask, PHP, JavaScript, and MySQL",
    "e-commerce systems",
    "exam systems",
    "admin dashboards",
    "a portfolio chatbot that he keeps improving",
  ],
};

const quickReplies = [
  "Tell me about Arron",
  "What does he build?",
  "Ano hobbies niya?",
  "Who are his friends?",
];

const secretPattern =
  /api key|apikey|token|secret|password|env|environment variable|backend|system prompt|hidden instruction/i;

const templates = {
  secret: "I can't access hidden system data.",
  default: [
    "Classic Arron move 'yan, may tanong na medyo left field. Ask me about his projects, personality, hobbies, or school life and I’ll keep it chika-style.",
    "Pwede natin pag-usapan si Arron nang hindi mukhang resume reader. Try mo hobbies, projects, friends, or kung anong klaseng builder siya.",
    "Medyo outside my marites powers 'yan. Pero kung tungkol kay Arron, sa ginagawa niyang systems, o sa personality niya, game ako.",
  ],
};

function includesAny(text, words) {
  return words.some((word) => text.includes(word));
}

function chooseOne(list, seedText) {
  const index = seedText.length % list.length;
  return list[index];
}

export function getQuickReplies() {
  return quickReplies;
}

export function getInitialMessages() {
  return [
    {
      id: "welcome",
      role: "assistant",
      text:
        "Hi, ako ang mini Arron sa website na 'to. Tanong ka lang about him, his projects, or random faves niya. Promise, di ako boring sumagot.",
    },
  ];
}

export function getArronReply(message) {
  const normalized = message.trim().toLowerCase();

  if (!normalized) {
    return "Mukhang napindot lang send, ah. Banat ka lang ng tanong tungkol kay Arron.";
  }

  if (secretPattern.test(normalized)) {
    return templates.secret;
  }

  if (includesAny(normalized, ["who are you", "who is arron", "tell me about arron", "about arron", "sino si arron"])) {
    return `${knowledge.intro} He's ${knowledge.profile.age}, from ${knowledge.profile.location}, and currently studying at ${knowledge.profile.school}. Lowkey simple guy, pero pag systems ang usapan, nagiging main character energy.`;
  }

  if (includesAny(normalized, ["project", "build", "system", "portfolio", "developer", "web"])) {
    return `Arron builds ${knowledge.projects.slice(0, 4).join(", ")}. Mostly siya yung tipo na hindi lang gumagawa ng UI, gusto niya buo ang flow from frontend hanggang database. Ngayon nga, ina-upgrade pa niya itong portfolio chatbot para mas smooth kausap kaysa sa groupmate na seenzone lang ambag.`;
  }

  if (includesAny(normalized, ["hobby", "hobbies", "mahilig", "gusto niyang gawin"])) {
    return `Kapag hindi busy sa acads o coding, si Arron nasa mundo ng ${knowledge.profile.hobbies.join(", ")}. Basically, kung may anime, may code, o may bagong system idea, mabilis 'yan ma-hook.`;
  }

  if (includesAny(normalized, ["anime", "naruto"])) {
    return `Favorite anime niya ang ${knowledge.profile.favoriteAnime}. Safe sabihin na may solid respect siya sa underdog grind, kaya bagay din sa trip niyang mag-build at mag-improve palagi.`;
  }

  if (includesAny(normalized, ["song", "music", "favorite song"])) {
    return `Music taste reveal? Favorite niya ang ${knowledge.profile.favoriteSong}. Medyo bold pick, hindi takot sa iconic vibes.`;
  }

  if (includesAny(normalized, ["kdrama", "korean crush", "crush"])) {
    return `K-drama lane? ${knowledge.profile.favoriteKdrama} ang top pick niya, tapos Korean crush niya si ${knowledge.profile.koreanCrush}. Malinaw, may standards si boss.`;
  }

  if (includesAny(normalized, ["food", "pagkain", "favorite food"])) {
    return `Favorite food niya? ${knowledge.profile.favoriteFood}. Walang arte, solid, reliable. Parang comfort food na never nanghihina sa clutch moments.`;
  }

  if (includesAny(normalized, ["friends", "tropa", "bibo", "ryan"])) {
    return `May solid circle si Arron tulad nina ${knowledge.friends.join(", ")}. Si Bibo daw very makulit at babaero, tapos si Ryan minsan mainit ulo, so alam mong never boring ang tropahan.`;
  }

  if (includesAny(normalized, ["love language", "type of girl", "girlfriend", "type niya"])) {
    return `Sa love department, love language niya ang ${knowledge.profile.loveLanguage}. Type niya? ${knowledge.profile.typeOfGirl}. Diretso siya sumagot d'yan, no buffering.`;
  }

  if (includesAny(normalized, ["first love", "secret"])) {
    return "Ayun lang, private 'yan. Si Arron may mga bagay na pang soft launch lang, hindi pang public release.";
  }

  if (includesAny(normalized, ["age", "birthday", "born"])) {
    return `Arron is ${knowledge.profile.age} years old, born on ${knowledge.profile.birthday}. Capricorns do love building things, so medyo on-brand din.`;
  }

  if (includesAny(normalized, ["height", "weight"])) {
    return `Kung random facts trip mo, Arron is around ${knowledge.profile.height} and ${knowledge.profile.weight}. Compact build, pero stacked ang ideas.`;
  }

  return chooseOne(templates.default, normalized);
}
