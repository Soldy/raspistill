const raspistill = new (require('./index.js').raspistill)();
const nanoTest   = new (require("nanoTest")).test();
console.log(
    raspistill.addOptions({
        "l":"latest.jpg",
        "o":"wo%s.jpg",
        "rotation": "90"
        }
    )
);
  




nanoTest.add(
    "cli test",
    {
        "function":raspistill.getCommand,
        "options":[]
    },
    "==",
    "raspistill -v -n -l latest.jpg -o wo%s.jpg -rot 90"
);

nanoTest.run();

