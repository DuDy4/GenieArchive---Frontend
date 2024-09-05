import moment from "moment";

const getGreeting = () => {
  const now = moment().hour();
  let greeting;

  if (now >= 5 && now < 12) {
    greeting = "Good Morning ";
  } else if (now >= 12 && now < 18) {
    greeting = "🌞 Good Afternoon ";
  } else {
    greeting = "🌙 Good Evening ";
  }

  return greeting;
};

export { getGreeting };
