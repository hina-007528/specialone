/* ===== EDIT EVERYTHING HERE ===== */
const IMG = { pt: "images/portrait.jpg", p1: "images/candles.jpg", p2: "images/cake.jpg", c1: "images/artistic-night.jpg", c2: "images/artistic-balcony.jpg", c3: "images/artistic-blue.jpg", c4: "images/artistic-red.jpg", r1: "images/real-couple-1.jpg", r2: "images/real-hands-night.jpg", r3: "images/real-couple-2.jpg" };

const D = {
    first: "Suleiman",
    name: "Suleiman Qaiser",
    turning: 25,

    song: {
        src: "audio/song.mp4",
        title: "Tu Chahiye",
        artist: "Atif Aslam",
        text: "Tu chahiye, jan. Always.",
        songStart: 0 // Start from the beginning
    },

    voice: {
        src: "audio/boice.mp4",
        title: "A little message from me.",
        script: "Jan... Happy Birthday. 🤍 / Main ne ye sab sirf apka liye banaya hai. / ap meri zindagi ho, mera mehram, meri better half. / apka saath ordinary din bhi bohot khoobsurat lagte hain. / Main hamesha apka saath hoon, har haal mein, har situation mein. / Main apki care karti rahungi, apsy pyaar karti rahungi, aur hamesha apko choose karungi. / Jan, jan, jan... I love you. Happy Birthday, Sona."
    },

    promises: [
        "I promise to become all four of your wives, so you'll never need to look for another. 😄",
        "I promise to give you so much meetha, so much sweetness, that you'll say 'bas, bas, enough!'... but only after the nikah, paji. 😉",
        "I promise to stay with you in every situation, in good days and hard days. I will always care for you, always love you, and always choose you, jan. Zindagi bhar."
    ],

    reasons: [
        "Because you're my better half, in every way that matters.",
        "Because your smile makes my whole day softer.",
        "Because with you, ordinary days feel special.",
        "Because you feel like home, jan.",
        "Because you make me feel safe.",
        "Because you listen, even when I'm just talking nonsense.",
        "Because of the way you care without making a show of it.",
        "Because you're my mehram, my person, my forever.",
        "Because your laugh is my favourite sound.",
        "Because you make hard days feel easier.",
        "Because you see me, even when I don't say anything.",
        "Because I can be completely myself with you.",
        "Because you're kind, even when it's not easy.",
        "Because I trust you with my heart.",
        "Because you make me want to be a better person.",
        "Because of all the little things you do and never mention.",
        "Because even your silence feels comforting.",
        "Because you're the first person I want to tell everything to.",
        "Because you're my sona, zindagi, and my favourite person.",
        "Because with you, the future feels beautiful instead of scary.",
        "Because you make love feel simple.",
        "Because I'd choose you again, every single time.",
        "Because I can't imagine my life without you.",
        "Because you're you, and that's enough. Jan jan jan, I love you. ❤️"
    ],

    intro: ["Some people...", "...make ordinary moments...", "...feel extraordinary."],
    person: [{ img: "p1", h: "Your smile." }, { img: "p2", h: "The way you light up a room." }],

    moments: [
        { img: "r2", t: "That first moment", p: "Some moments are small when they happen,<br>but become huge in your memory.", d: "" },
        { img: "c1", art: 1, t: "Mera Mehram", p: "Somehow, ordinary days started feeling a little more special. You grew into my better half.", d: "" },
        { img: "c2", art: 1, t: "One of those days", p: "One of the memories I could replay a thousand times with you, Zindagi.", d: "" },
        { img: "c3", art: 1, t: "Somewhere along the way", p: "I realized how much you had become a part of my world, Sona.", d: "" },
        { img: "c4", art: 1, t: "Today ❤️", p: "And now I'm here, celebrating you.", d: "" }
    ],

    real: [{ img: "r1", h: "Some memories don't need words." }, { img: "r3", h: "Because they already say everything, meri better half." }],

    loves: [
        { k: "Your smile", i: "p1", m: "It has a way of making the whole day softer." },
        { k: "Your kindness", i: "c2", m: "The quiet way you care says more than words ever could." },
        { k: "Your laugh", i: "p2", m: "My favourite sound, and I'd never get tired of it." },
        { k: "The way you care", i: "c1", m: "You make people feel like they matter." },
        { k: "Your little habits", i: "c3", m: "The small things are the ones I notice most." },
        { k: "Simply being you", i: "pt", m: "That's honestly more than enough." }
    ],

    letter: ["Dear Jan,", "I don't know if words can really explain how special you are to me.", "You bring so much light into my life. You make the ordinary days feel beautiful, and the difficult days feel easier.", "I'm so grateful for you, for your smile, your kindness, your heart.", "Thank you for being my better half.", "With all my love ❤️"],
    gift: "You're my favourite person, today and every day. Happy Birthday, Husband.",
    wish: "May every wish you made come true.",
    climax: ["Jan jan jan...", "I love you.", "Mera Mehram, Meri better half.", "Always and forever."],
    climaxImg: "p2",
    final: ["Here's to another beautiful year of you.", "Meethi Begum loves you."]
};
