const tasks = [
    {
      id: 1,
      Title: "Morning Run",
      Desc: "Run 5km in the park to start your day fresh.",
      Exp: 50,
      onDone: () => console.log("Morning Run completed!"),
    },
    {
      id: 2,
      Title: "Read a Book",
      Desc: "Read 20 pages of a self-improvement book.",
      Exp: 30,
      onDone: () => console.log("Read a Book completed!"),
    },
    {
      id: 3,
      Title: "Meditation",
      Desc: "Meditate for 10 minutes to clear your mind.",
      Exp: 20,
      onDone: () => console.log("Meditation completed!"),
    },
    {
      id: 4,
      Title: "Workout",
      Desc: "Complete a 30-minute workout session.",
      Exp: 60,
      onDone: () => console.log("Workout completed!"),
    },
    {
      id: 5,
      Title: "Learn a New Skill",
      Desc: "Spend 1 hour learning a new programming concept.",
      Exp: 40,
      onDone: () => console.log("Learn a New Skill completed!"),
    },
  ];
  
  export default tasks;
  