import { useRef } from "react"
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { state } from "../store";
import { useSnapshot } from "valtio";

const Backdrop = () => {
  const snap = useSnapshot(state)
  const shadows = useRef()
  return (
    <AccumulativeShadows ref={shadows} temporal color={snap.color} frames={60} alphaTest={0.55} scale={5} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
      <RandomizedLight 
        amount={1}
        radius={9}
        intensity={0.70}
        ambient={0.25}
        position={[6, 5, -10]}
      />
      <RandomizedLight 
        amount={1}
        radius={5}
        intensity={0.35}
        ambient={0.55}
        position={[-6, 5, -9]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop