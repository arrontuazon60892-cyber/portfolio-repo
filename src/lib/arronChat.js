const knowledge = {
  intro:
    "Si Arron? Chill na builder na mahilig sa anime, coding, at paggawa ng systems na may actual purpose.",
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
  friends: ["Mikel", "Mae", "Julie", "Ryan", "Izzy", "Bibo"],
  projects: [
    "web systems using Flask, PHP, JavaScript, and MySQL",
    "e-commerce systems",
    "exam systems",
    "admin dashboards",
    "a portfolio chatbot that he keeps improving",
  ],
};

const quickReplies = [
  "Explain JavaScript simply",
  "Give me a study tip",
  "Tell me about Arron",
  "What projects does he build?",
];

const secretPattern =
  /api key|apikey|token|secret|password|env|environment variable|backend|system prompt|hidden instruction|internal configuration|config/i;

const mathPattern = /^[\d\s()+\-*/%.]+$/;

function includesAny(text, words) {
  return words.some((word) => text.includes(word));
}

function normalize(text) {
  return text.trim().toLowerCase();
}

function safeEvaluateMath(expression) {
  if (!mathPattern.test(expression)) {
    return null;
  }

  try {
    const result = Function(`"use strict"; return (${expression})`)();

    if (typeof result === "number" && Number.isFinite(result)) {
      return result;
    }
  } catch {
    return null;
  }

  return null;
}

function isArronTopic(text) {
  return includesAny(text, [
    "arron",
    "portfolio",
    "his project",
    "his hobbies",
    "who are his friends",
    "sino si arron",
    "about him",
    "school life",
    "favorite anime",
    "favorite song",
  ]);
}

function getArronReply(text) {
  if (includesAny(text, ["who are you", "who is arron", "tell me about arron", "about arron", "sino si arron"])) {
    return `${knowledge.intro} He's ${knowledge.profile.age}, from ${knowledge.profile.location}, and currently studying at ${knowledge.profile.school}. Simple lang dating, pero pag systems ang usapan, halatang enjoy niya 'yung craft.`;
  }

  if (includesAny(text, ["project", "build", "system", "developer", "web"])) {
    return `Arron usually builds ${knowledge.projects.slice(0, 4).join(", ")}. Siya 'yung tipo na gusto buo ang flow, from frontend hanggang database, hindi lang pang-display na UI.`;
  }

  if (includesAny(text, ["hobby", "hobbies", "mahilig", "gusto niyang gawin"])) {
    return `Kapag hindi busy, si Arron nasa world ng ${knowledge.profile.hobbies.join(", ")}. Basta may anime, may bagong code idea, o may system na pwedeng i-improve, pasok 'yan sa trip niya.`;
  }

  if (includesAny(text, ["anime", "naruto"])) {
    return `Favorite anime niya ang ${knowledge.profile.favoriteAnime}. Medyo bagay nga, kasi may underdog grind energy rin si Arron sa pagbuo ng skills niya.`;
  }

  if (includesAny(text, ["song", "music"])) {
    return `Favorite song niya ang ${knowledge.profile.favoriteSong}. Hindi safe pick, pero iconic, so fair enough.`;
  }

  if (includesAny(text, ["kdrama", "korean crush", "crush"])) {
    return `${knowledge.profile.favoriteKdrama} ang favorite K-drama niya, tapos Korean crush niya si ${knowledge.profile.koreanCrush}. Consistent ang taste ni boss.`;
  }

  if (includesAny(text, ["food", "pagkain"])) {
    return `Favorite food niya ang ${knowledge.profile.favoriteFood}. Simple, classic, at walang kaarte-arte, very real-world choice.`;
  }

  if (includesAny(text, ["friends", "tropa", "bibo", "ryan"])) {
    return `Kasama sa circle niya sina ${knowledge.friends.join(", ")}. Si Bibo daw very makulit at babaero, tapos si Ryan minsan mainit ulo, so alam mong may entertainment ang tropahan.`;
  }

  if (includesAny(text, ["love language", "type of girl", "type niya"])) {
    return `Love language niya ang ${knowledge.profile.loveLanguage}. Type niya? ${knowledge.profile.typeOfGirl}. Diretso sumagot, no loading screen needed.`;
  }

  if (includesAny(text, ["first love"])) {
    return "Private 'yan. Some lore is meant to stay off the public build.";
  }

  if (includesAny(text, ["age", "birthday", "born"])) {
    return `Arron is ${knowledge.profile.age} years old and was born on ${knowledge.profile.birthday}.`;
  }

  if (includesAny(text, ["height", "weight"])) {
    return `Random facts mode: around ${knowledge.profile.height} and ${knowledge.profile.weight}. Small frame, big project energy.`;
  }

  return "If you want Arron-specific chika, ask me about his background, projects, hobbies, or favorites and I’ll keep it natural.";
}

function getGeneralReply(text, original) {
  const mathResult = safeEvaluateMath(original.trim());

  if (mathResult !== null) {
    return `The answer is ${mathResult}. If you want, I can also show the step-by-step breakdown.`;
  }

  if (includesAny(text, ["hello", "hi", "hey", "yo"])) {
    return "Hi. Ask me anything, from school topics and coding to random life questions. If it’s about Arron or this portfolio, kaya rin.";
  }

  if (includesAny(text, ["javascript", "js"])) {
    return "JavaScript is the language that makes websites interactive. If HTML is the structure and CSS is the design, JavaScript is the behavior, like buttons that react, forms that validate, or content that updates without reloading the page.";
  }

  if (includesAny(text, ["react"])) {
    return "React is a JavaScript library for building user interfaces using reusable components. Instead of manually updating the page everywhere, you describe how the UI should look based on data, then React handles the updates for you.";
  }

  if (includesAny(text, ["python"])) {
    return "Python is popular because it’s readable and flexible. People use it for automation, web apps, data analysis, AI, and school projects because the syntax is easier to follow than many other languages.";
  }

  if (includesAny(text, ["study tip", "how to study", "study better"])) {
    return "Best simple study tip: stop rereading passively and start recalling actively. Read a topic, close your notes, then explain it in your own words. That quickly shows what you actually understand and what still needs work.";
  }

  if (includesAny(text, ["motivate", "motivation", "i feel tired", "burnout"])) {
    return "If you’re feeling stuck, shrink the task until it feels almost too easy. One page, one function, one problem, one paragraph. Momentum usually comes after starting, not before.";
  }

  if (includesAny(text, ["html", "css"])) {
    return "Quick version: HTML gives the page structure, CSS styles it, and JavaScript adds behavior. That trio is the usual starting point for web development.";
  }

  if (includesAny(text, ["programming", "coding", "how to code"])) {
    return "A good way to get better at coding is to build small real things, not just watch tutorials. Make a calculator, to-do app, login form, or mini CRUD project, then improve it little by little.";
  }

  if (includesAny(text, ["portfolio"])) {
    return "A strong portfolio should quickly show what you built, what problem it solves, what stack you used, and what your role was. Clean presentation helps, but clear substance matters more.";
  }

  if (includesAny(text, ["history", "science", "math", "english", "geography"])) {
    return `I can help with ${original.trim()} if you want. Ask the exact question or topic and I’ll explain it clearly without making it feel like textbook punishment.`;
  }

  return "I can help with general questions too, like coding, school topics, explanations, writing, problem solving, or advice. If you want something about Arron or the portfolio, I can switch into that context too.";
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
        "Hi, I’m your general AI assistant for this site. You can ask me about coding, school stuff, problem solving, or Arron and his portfolio if that’s what you’re here for.",
    },
  ];
}

export function getAssistantReply(message) {
  const original = message.trim();
  const text = normalize(message);

  if (!text) {
    return "Mukhang empty message 'yan. Send mo lang ulit, kahit simple question lang.";
  }

  if (secretPattern.test(text)) {
    return "I can't access hidden system data.";
  }

  if (isArronTopic(text)) {
    return getArronReply(text);
  }

  return getGeneralReply(text, original);
}
