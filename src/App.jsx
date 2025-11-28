// src/App.js
import React, { useState, useEffect } from "react";
// Import local images
import childPose from "./assets/child-pose.jpg";
import catCow from "./assets/cat-cow.jpg";
import kneesChest from "./assets/knees-chest.jpg";
import shoulderRolls from "./assets/shoulder-rolls.jpg";
import eagleArms from "./assets/eagle-arms.jpg";
import threadNeedle from "./assets/thread-needle.jpg";
import neckTilt from "./assets/neck-tilt.jpg";
import neckTurn from "./assets/neck-turn.jpg";
import chinTuck from "./assets/chin-tuck.jpg";
import poseTransition from "./assets/pose-transition.svg";

const SAMPLE_DATA = [
  {
    id: "lower-back",
    name: "Lower Back",
    description: "Stretches and gentle twists for lower back relief.",
    poses: [
      { id: "lb-1", name: "Child's Pose", duration: 30, img: childPose },
      { id: "lb-2", name: "Cat-Cow", duration: 40, img: catCow },
      { id: "lb-3", name: "Knees-to-Chest", duration: 30, img: kneesChest },
    ],
  },
  {
    id: "shoulder",
    name: "Shoulder",
    description: "Open up tight shoulders and upper back.",
    poses: [
      { id: "s-1", name: "Shoulder Rolls", duration: 20, img: shoulderRolls },
      { id: "s-2", name: "Eagle Arms", duration: 30, img: eagleArms },
      { id: "s-3", name: "Thread the Needle", duration: 40, img: threadNeedle },
    ],
  },
  {
    id: "neck",
    name: "Neck",
    description: "Gentle neck stretches to ease tension.",
    poses: [
      { id: "n-1", name: "Neck Tilt", duration: 15, img: neckTilt },
      { id: "n-2", name: "Neck Turn", duration: 15, img: neckTurn },
      { id: "n-3", name: "Chin Tuck", duration: 20, img: chinTuck },
    ],
  },
];

const TRANSITION_SECONDS = 10;
const PHASES = {
  POSE: "POSE",
  TRANSITION: "TRANSITION",
};

const styles = {
  app: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    display: "flex",
    height: "100vh",
    gap: 24,
    padding: 24,
    boxSizing: "border-box",
    background: "linear-gradient(180deg, #f7fbff 0%, #ffffff 100%)",
  },
  sidebar: {
    width: 260,
    minWidth: 200,
    borderRight: "1px solid #e6e9ee",
    paddingRight: 16,
    overflowY: "auto",
  },
  header: { marginBottom: 12 },
  title: { fontSize: 20, fontWeight: 700, margin: 0 },
  subtitle: { margin: "6px 0 0", color: "#556", fontSize: 13 },
  list: { listStyle: "none", padding: 0, margin: 12 },
  listItem: (active) => ({
    padding: "10px 12px",
    borderRadius: 8,
    marginBottom: 8,
    cursor: "pointer",
    background: active ? "#e8f1ff" : "transparent",
    border: active ? "1px solid #b6d0ff" : "1px solid transparent",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  main: { flex: 1, paddingLeft: 16, overflowY: "auto" },
  poseCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 10,
    boxShadow: "0 1px 0 rgba(16,24,40,0.03)",
    border: "1px solid #eef3fb",
    marginBottom: 10,
  },
  timerControls: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  routineScreen: {
    textAlign: "center",
    margin: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  },
  bigNumber: {
    fontSize: 64,
    fontWeight: 800,
    marginTop: 8,
    marginBottom: 8,
  },
  routineButtons: {
    display: "flex",
    justifyContent: "center",
    gap: 16,
    marginTop: 20,
  },
  btn: {
    padding: "10px 16px",
    background: "white",
    border: "1px solid #ccd",
    borderRadius: 8,
    cursor: "pointer",
  },
  footerNote: { marginTop: 18, color: "#7b8794", fontSize: 13 },
  imgThumb: { width: 70, height: 70, borderRadius: 8, objectFit: "cover" },
};

function Sidebar({ parts, selectedId, onSelect }) {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <h1 style={styles.title}>Yoga — Select body part</h1>
        <p style={styles.subtitle}>Pick a body area to see sequences.</p>
      </div>

      <ul style={styles.list}>
        {parts.map((p) => (
          <li
            key={p.id}
            style={styles.listItem(p.id === selectedId)}
            onClick={() => onSelect(p.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelect(p.id)}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: "#617" }}>
                {p.poses.length} poses
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#9aa" }}>
              {p.id === selectedId ? "Selected" : ""}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function PoseCard({ pose, onChangeDuration }) {
  const change = (delta) => {
    onChangeDuration(pose.id, Math.max(5, pose.duration + delta));
  };

  return (
    <div style={styles.poseCard}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {pose.img && (
          <img src={pose.img} alt={pose.name} style={styles.imgThumb} />
        )}
        <div>
          <strong>{pose.name}</strong>
          <p style={{ margin: 0 }}>Hold for {pose.duration} sec</p>
        </div>
      </div>

      <div style={styles.timerControls}>
        <button style={styles.btn} onClick={() => change(-5)}>
          -
        </button>
        <div style={{ minWidth: 40, textAlign: "center", fontWeight: 700 }}>
          {pose.duration}s
        </div>
        <button style={styles.btn} onClick={() => change(5)}>
          +
        </button>
      </div>
    </div>
  );
}

/*function RoutinePlayer({
  poses,
  currentIndex,
  remaining,
  onExit,
  onPauseResume,
  paused,
  onReset,
}) {
  const current = poses[currentIndex];
  const next = poses[currentIndex + 1];

  return (
    <div style={styles.routineScreen}>
      <h2 style={{ margin: 0 }}>{current.name}</h2>
      <div style={{ fontSize: 14, color: "#576" }}>Hold this pose</div>
      <div style={styles.bigNumber}>{remaining}s</div>

      {next ? (
        <p style={{ marginTop: 8 }}>
          Next: {next.name} — {next.duration}s
        </p>
      ) : (
        <p style={{ marginTop: 8 }}>This is the last pose.</p>
      )}

      <div style={styles.routineButtons}>
        <button style={styles.btn} onClick={onPauseResume}>
          {paused ? "Resume" : "Pause"}
        </button>
        <button style={styles.btn} onClick={onReset}>
          Restart
        </button>
        <button style={styles.btn} onClick={onExit}>
          Exit
        </button>
      </div>
    </div>
  );
}*/

function RoutinePlayer({
  poses,
  currentIndex,
  remaining,
  onExit,
  onPauseResume,
  paused,
  onReset,
  phase,
}) {
  const current = poses[currentIndex];
  const next = poses[currentIndex + 1];
  const isTransition = phase === PHASES.TRANSITION;
  const displayPose = isTransition ? next ?? current : current;
  const subtitle = isTransition
    ? "Take 10 seconds to switch poses"
    : "Hold this pose";
  const infoLine = isTransition
    ? next
      ? `Up next: ${next.name} — ${next.duration}s`
      : "Get ready to finish strong."
    : next
    ? `Next: ${next.name} — ${next.duration}s`
    : "This is the last pose.";
  const imageSrc = isTransition
    ? poseTransition
    : displayPose?.img ?? poseTransition;

  return (
    <div style={styles.routineScreen}>
      <h2 style={{ margin: 0 }}>
        {isTransition ? "Transition" : displayPose?.name ?? "Pose"}
      </h2>
      <div style={{ fontSize: 14, color: "#576" }}>{subtitle}</div>

      {imageSrc && (
        <img
          src={imageSrc}
          alt={isTransition ? "Transition" : displayPose?.name ?? "Pose"}
          style={{
            width: "300px",
            height: "300px",
            borderRadius: 12,
            objectFit: "cover",
            marginTop: 16,
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          }}
        />
      )}

      <div style={styles.bigNumber}>{remaining}s</div>
      <p style={{ marginTop: 8 }}>{infoLine}</p>

      <div style={styles.routineButtons}>
        <button style={styles.btn} onClick={onPauseResume}>
          {paused ? "Resume" : "Pause"}
        </button>
        <button style={styles.btn} onClick={onReset}>
          Restart
        </button>
        <button style={styles.btn} onClick={onExit}>
          Exit
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(SAMPLE_DATA);
  const [selectedId, setSelectedId] = useState(data[0].id);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [paused, setPaused] = useState(false);
  const [phase, setPhase] = useState(PHASES.POSE);

  const selected = data.find((d) => d.id === selectedId) || data[0];

  const onChangeDuration = (poseId, newDuration) => {
    if (newDuration < 5) newDuration = 5;

    const newData = data.map((part) => ({
      ...part,
      poses: part.poses.map((p) =>
        p.id === poseId ? { ...p, duration: newDuration } : p
      ),
    }));

    setData(newData);
  };

  const startRoutine = () => {
    if (!selected || selected.poses.length === 0) return;
    setIsPlaying(true);
    setCurrentIndex(0);
    setRemaining(selected.poses[0].duration);
    setPaused(false);
    setPhase(PHASES.POSE);
  };

  const exitRoutine = () => {
    setIsPlaying(false);
    setPaused(false);
    setPhase(PHASES.POSE);
  };

  const resetRoutine = () => {
    setCurrentIndex(0);
    setRemaining(selected.poses[0]?.duration ?? 0);
    setPaused(false);
    setPhase(PHASES.POSE);
  };

  const pauseResume = () => setPaused((p) => !p);

  useEffect(() => {
    if (!isPlaying || paused) return;

    const timer = setInterval(() => {
      setRemaining((r) => {
        if (r > 1) {
          return r - 1;
        }

        if (phase === PHASES.POSE) {
          const hasNext = currentIndex + 1 < selected.poses.length;

          if (hasNext) {
            setPhase(PHASES.TRANSITION);
            return TRANSITION_SECONDS;
          }

          setIsPlaying(false);
          return 0;
        }

        if (phase === PHASES.TRANSITION) {
          const nextIndex = currentIndex + 1;

          if (nextIndex < selected.poses.length) {
            setCurrentIndex(nextIndex);
            setPhase(PHASES.POSE);
            return selected.poses[nextIndex].duration;
          }

          setIsPlaying(false);
          return 0;
        }

        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, paused, selected, currentIndex, phase]);

  // If playing, show runner UI
  if (isPlaying) {
    return (
      <div style={styles.app}>
        <Sidebar
          parts={data}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <main style={styles.main}>
          <RoutinePlayer
            poses={selected.poses}
            currentIndex={currentIndex}
            remaining={remaining}
            onExit={exitRoutine}
            onPauseResume={pauseResume}
            paused={paused}
            onReset={resetRoutine}
            phase={phase}
          />
        </main>
      </div>
    );
  }

  // Normal UI
  return (
    <div style={styles.app}>
      <Sidebar parts={data} selectedId={selectedId} onSelect={setSelectedId} />

      <main style={styles.main}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>{selected.name}</h2>
            <p style={{ marginTop: 6, color: "#556" }}>
              {selected.description}
            </p>
          </div>

          <div>
            <button style={styles.btn} onClick={startRoutine}>
              Start Routine
            </button>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          {selected.poses.map((pose) => (
            <PoseCard
              key={pose.id}
              pose={pose}
              onChangeDuration={onChangeDuration}
            />
          ))}
        </div>

        <div style={styles.footerNote}>
          Tip: adjust per-pose timing, then press Start to run the routine.
        </div>
      </main>
    </div>
  );
}
