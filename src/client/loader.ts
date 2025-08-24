import runClientDemo from "./main";

// Separate loader to avoid side effects on import; bootstrap will import this.
export = function () {
  runClientDemo();
};
