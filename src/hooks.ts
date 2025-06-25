import { useEffect, useState } from "react";

function getRawOrientation(event?: DeviceOrientationEvent) {
  if (!event) {
    return {
      alpha: 0,
      beta: 0,
      gamma: 0,
    };
  }

  return {
    alpha: event.alpha ?? 0,
    beta: event.beta ?? 0,
    gamma: event.gamma ?? 0,
  };
}

type Orientation = ReturnType<typeof getRawOrientation>;

type OrientationData = { absolute: Orientation; relative: Orientation };

const getOrientationObject = (
  e?: DeviceOrientationEvent,
) => {
  const orientation = getRawOrientation(e);
  return {
    absolute: orientation,
    relative: {
      alpha: orientation.alpha,
      beta: orientation.beta,
      gamma: orientation.gamma,
    },
  };
};

export function useOrientation() {
  const [orientation, setOrientation] = useState<OrientationData>(
    getOrientationObject(),
  );

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation(getOrientationObject(event));
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const resetBaseOrientation = () => {
    // setFirstRead(true);
    // setBaseOrientation(getRawOrientation());
  };

  return {
    orientation,
    resetBaseOrientation,
  };
}
