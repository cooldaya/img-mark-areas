import mitt from "mitt";

const eventBus = mitt();

export const onEvents = (events) => {
  for (let type in events) {
    eventBus.on(type, events[type]);
  }
};

export const offEvents = (events) => {
  for (let type in events) {
    eventBus.off(type, events[type]);
  }
};

export default eventBus;
