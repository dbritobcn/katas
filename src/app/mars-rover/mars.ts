export enum RoverDirections {
  NORTH = '0',
  EAST = '1',
  SOUTH = '2',
  WEST = '3',
}

export const RoverDirectionsMapping: {[key: string]: RoverDirections } = {
  '0' : RoverDirections.NORTH,
  '1' : RoverDirections.EAST,
  '2' : RoverDirections.SOUTH,
  '3' : RoverDirections.WEST
}

export enum RoverCommands {
  FORWARD = 'F',
  BACKWARD = 'B',
  LEFT = 'L',
  RIGHT = 'R'
}

abstract class Command {
  abstract execute(rover: Rover): Rover;
}

class CommandForward implements Command {
  execute(rover: Rover): Rover {
    switch(rover.getDirection()) {
      case RoverDirections.NORTH:
        return Rover.create(rover.x, rover.y + 1, RoverDirections.NORTH);
      case RoverDirections.SOUTH:
        return Rover.create(rover.x, rover.y - 1, RoverDirections.SOUTH);
      case RoverDirections.EAST:
        return Rover.create(rover.x + 1, rover.y, RoverDirections.EAST);
      case RoverDirections.WEST:
        return Rover.create(rover.x - 1, rover.y, RoverDirections.WEST);
      default:
        return rover;
    }
  }
}

class CommandBackward implements Command {
  execute(rover: Rover): Rover {
    switch(rover.getDirection()) {
      case RoverDirections.NORTH:
        return Rover.create(rover.x, rover.y - 1, RoverDirections.NORTH);
      case RoverDirections.SOUTH:
        return Rover.create(rover.x, rover.y + 1, RoverDirections.SOUTH);
      case RoverDirections.EAST:
        return Rover.create(rover.x - 1, rover.y, RoverDirections.EAST);
      case RoverDirections.WEST:
        return Rover.create(rover.x + 1, rover.y, RoverDirections.WEST);
      default:
        return rover;
    }
  }
}

class CommandLeft implements Command {
  execute(rover: Rover): Rover {
    const roverDirection = parseInt(rover.getDirection(), 10);
    const nextDirection: number = roverDirection === 0 ?
      Object.keys(RoverDirections).length - 1 :
      roverDirection - 1;

    return Rover.create(rover.x, rover.y, RoverDirectionsMapping[nextDirection]);
  }
}

class CommandRight implements Command {
  execute(rover: Rover): Rover {
    const roverDirection = parseInt(rover.getDirection(), 10);
    const nextDirection: number = roverDirection < Object.keys(RoverDirections).length - 1 ?
      roverDirection + 1 :
      0;

    return Rover.create(rover.x, rover.y, RoverDirectionsMapping[nextDirection]);
  }
}

class CommandStrategyFactory {
  getCommand(command: RoverCommands): Command {
    switch(command) {
      case RoverCommands.FORWARD:
        return new CommandForward();
      case RoverCommands.BACKWARD:
        return new CommandBackward();
      case RoverCommands.LEFT:
        return new CommandLeft();
      case RoverCommands.RIGHT:
        return new CommandRight();
      default:
        return new CommandForward();
    }
  }
}

export class Rover {
  private constructor(public readonly x: number,
                      public readonly y: number,
                      private direction: number) {}

  static create(x: number, y: number, direction: RoverDirections): Rover {
    return new Rover(x, y, parseInt(direction, 10));
  }

  getCoordinates(): {[key: string]: number} {
    return {
      x: this.x,
      y: this.y
    };
  }

  getDirection(): string {
    return this.direction.toString();
  }

  execute(commands: RoverCommands[]): Rover {
    let rover: Rover = this;
    const factory = new CommandStrategyFactory();

    for (const command of commands) {
      rover = factory.getCommand(command).execute(rover);
    }

    return rover;
  }
}
