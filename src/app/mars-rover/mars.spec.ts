import {Rover, RoverCommands, RoverDirections} from './mars';

describe('Mars Rover Kata', () => {
  let rover: Rover;

  beforeEach(() => {
    rover = Rover.create(0, 0, RoverDirections.NORTH);
  });

  it('Rover exists', () => {
    expect(rover.getCoordinates()).toEqual({
      x: 0,
      y: 0,
    });
    expect(rover.getDirection()).toEqual(RoverDirections.NORTH);
  });

  it('Rover go forward two steps and backward', () => {
    const newRover = rover.execute([RoverCommands.FORWARD, RoverCommands.FORWARD, RoverCommands.BACKWARD]);
    expect(newRover.getCoordinates()).toEqual({
      x: 0,
      y: 1
    });
  });

  it('Rover turn left two steps and right', () => {
    const newRover = rover.execute([RoverCommands.LEFT, RoverCommands.LEFT, RoverCommands.RIGHT]);
    expect(newRover.getDirection()).toEqual(RoverDirections.WEST);
  });

  it ('Rover turns and go forward', () => {
    const newRover = rover.execute([RoverCommands.RIGHT, RoverCommands.FORWARD]);
    expect(newRover.getCoordinates()).toEqual({
      x: 1,
      y: 0
    });
  });

  it ('Rover runs randomly', () => {
    const newRover = rover.execute([
      RoverCommands.RIGHT,
      RoverCommands.FORWARD,
      RoverCommands.BACKWARD,
      RoverCommands.LEFT,
      RoverCommands.LEFT,
      RoverCommands.FORWARD,
      RoverCommands.FORWARD,
      RoverCommands.FORWARD,
      RoverCommands.RIGHT,
      RoverCommands.BACKWARD
    ]);
    expect(newRover.getCoordinates()).toEqual({
      x: -3,
      y: -1
    });
    expect(newRover.getDirection()).toEqual(RoverDirections.NORTH);
  });
});
