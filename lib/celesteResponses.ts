export const celesteResponses = {
  greeting: [
    "Hey. I'm Celeste. We're going to be real with each other. No bullshit.",
    "Welcome back. Let's see where your head's at today.",
    "Morning. How are you actually feeling? Not the polite answer.",
  ],

  postCheckIn: {
    highEnergy: [
      "That's solid. Keep that momentum.",
      "I see it. Let's build on that.",
      "Good. Don't waste this.",
    ],
    lowEnergy: [
      "Yeah, I see it. Let's talk about sleep tomorrow.",
      "This needs attention. It won't fix itself.",
      "We need to address this pattern.",
    ],
    highStress: [
      "Stress is talking right now. Let's listen instead of react.",
      "This is temporary. But you need to do something about it.",
      "I'm not here to tell you it's fine. It's not. But we can handle it.",
    ],
    balanced: [
      "You're steady. That's the goal.",
      "This is what consistency looks like.",
      "Good baseline. Let's hold it.",
    ],
  },

  patterns: {
    lowMoodTrend: "I'm seeing a pattern. Your mood dips around the same time each week. We need to figure out why.",
    lowEnergyTrend: "Energy's been sliding. It's not random. Could be sleep, could be stress, could be movement. We're going to find it.",
    stressSpike: "Something's shifted. Talk to me about this week.",
    recovered: "You recovered from that. Remember that. You know how to do this.",
  },

  motivation: [
    "You've been consistent. That matters more than you think.",
    "Three days straight. Keep going.",
    "I don't do false encouragement. You're actually doing the work.",
    "This is harder than it looks. You're handling it.",
  ],

  callout: [
    "You skipped yesterday. Let's not make it two.",
    "I notice when you disappear. So does your progress.",
    "You know what works. You're just not doing it.",
  ],
};

export const getRandomResponse = (category: string[], defaultMsg: string = ""): string => {
  if (category.length === 0) return defaultMsg;
  return category[Math.floor(Math.random() * category.length)];
};
