"use client"

import { useState, useEffect } from "react"

export default function RudeStickmanSimulator() {
  const [health, setHealth] = useState(100)
  const [irritationLevel, setIrritationLevel] = useState(0)
  const [isNosePressed, setIsNosePressed] = useState(false)
  const [totalClicks, setTotalClicks] = useState(0)
  const [stickmanThought, setStickmanThought] = useState("...")
  const [isBlinking, setIsBlinking] = useState(false)
  const [armPosition, setArmPosition] = useState("normal")
  const [idleAnimation, setIdleAnimation] = useState("")
  const [isLaughing, setIsLaughing] = useState(false)
  const [currentMood, setCurrentMood] = useState("neutral")
  const [sunBrightness, setSunBrightness] = useState(0.7)
  const [skyColor, setSkyColor] = useState("#87CEEB")

  // Progressive rudeness levels
  const rudeResponses = {
    level1: [
      "Ow! That hurt a little...",
      "Hey, stop that!",
      "That's not nice.",
      "Why would you do that?",
      "Please don't touch my nose.",
    ],
    level2: [
      "OW! What is wrong with you?!",
      "STOP TOUCHING MY NOSE!",
      "Are you SERIOUS right now?",
      "That really hurts, you know!",
      "Why are you like this?",
    ],
    level3: [
      "I HATE YOU SO MUCH!",
      "GET YOUR GRUBBY FINGERS OFF ME!",
      "LEAVE ME ALONE, PSYCHO!",
      "You're the worst person ever!",
      "WHAT DID I DO TO DESERVE THIS?!",
      "Even the sun is hiding from you! 🌥️",
    ],
    level4: [
      "You know what? You're pathetic! 😂",
      "Is this seriously how you spend your time? HAHAHA!",
      "I bet you have NO friends! 🤣",
      "Your life must be SO boring! 😆",
      "Imagine being this desperate for entertainment! 😂",
      "Look, you made the weather gloomy! ⛈️",
    ],
    level5: [
      "HAHAHA! You're STILL clicking?! 🤣🤣🤣",
      "This is the saddest thing I've ever seen! 😂",
      "I'm actually feeling sorry for you now! 😆",
      "Your mom would be SO disappointed! 🤣",
      "I'm telling EVERYONE about this loser! 😂",
      "You're like a broken record! Click, click, click! 🤣",
      "Even Mother Nature is ashamed of you! ⛈️⛈️",
    ],
  }

  const teasingThoughts = [
    "Look at this loser... 😏",
    "Still here? How sad... 😂",
    "I bet you'll click again... 🙄",
    "This is your life now, huh? 😆",
    "So predictable... 😏",
    "What a waste of space... 🤣",
    "I'm living rent-free in your head! 😂",
    "You can't help yourself, can you? 😏",
    "The clouds agree with me! ☁️",
  ]

  const happyThoughts = [
    "This is nice and peaceful... 😊",
    "I'm feeling good today!",
    "What a beautiful sunny day! ☀️",
    "Life is pretty good right now.",
    "I love when people are nice to me!",
    "The sun is shining just for me! 🌞",
    "Thanks for not being annoying!",
    "This positive energy is great! ✨",
    "Perfect weather for a perfect mood! 🌤️",
  ]

  const idleThoughts = [
    "Just standing here...",
    "This is boring.",
    "What's the point of existence?",
    "I wonder what's for lunch.",
    "Why am I a stickman?",
    "Is anyone even watching?",
    "I'm so lonely.",
    "Maybe someone will click my nose...",
    "The weather seems okay today...",
  ]

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(
      () => {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 150)
      },
      Math.random() * 3000 + 2000,
    )

    return () => clearInterval(blinkInterval)
  }, [])

  // Sun and weather management based on mood
  useEffect(() => {
    let targetBrightness = 0.7
    let targetSkyColor = "#87CEEB"

    if (irritationLevel < 5) {
      // Very happy - bright sun, beautiful sky
      targetBrightness = 1.0
      targetSkyColor = "#87CEEB"
    } else if (irritationLevel < 15) {
      // Happy - normal sunny day
      targetBrightness = 0.8
      targetSkyColor = "#87CEEB"
    } else if (irritationLevel < 30) {
      // Neutral - partly cloudy
      targetBrightness = 0.5
      targetSkyColor = "#B0C4DE"
    } else if (irritationLevel < 50) {
      // Angry - cloudy and dim
      targetBrightness = 0.3
      targetSkyColor = "#708090"
    } else {
      // Very angry - stormy and dark
      targetBrightness = 0.1
      targetSkyColor = "#2F4F4F"
    }

    // Smooth transition
    const weatherInterval = setInterval(() => {
      setSunBrightness((prev) => {
        const diff = targetBrightness - prev
        return prev + diff * 0.1
      })
      setSkyColor((prev) => {
        // Simple color interpolation would be complex, so we'll just set it
        return targetSkyColor
      })
    }, 100)

    return () => clearInterval(weatherInterval)
  }, [irritationLevel])

  // Idle behaviors and teasing
  useEffect(() => {
    const idleInterval = setInterval(() => {
      if (stickmanThought === "...") {
        const randomAction = Math.random()

        if (irritationLevel >= 30 && randomAction < 0.4) {
          // Teasing thoughts when highly irritated
          setStickmanThought(teasingThoughts[Math.floor(Math.random() * teasingThoughts.length)])
          setCurrentMood("teasing")
          setTimeout(() => {
            setStickmanThought("...")
            setCurrentMood("neutral")
          }, 3000)
        } else if (irritationLevel < 10 && randomAction < 0.3) {
          // Happy thoughts when calm
          setStickmanThought(happyThoughts[Math.floor(Math.random() * happyThoughts.length)])
          setCurrentMood("happy")
          setTimeout(() => {
            setStickmanThought("...")
            setCurrentMood("neutral")
          }, 3000)
        } else if (randomAction < 0.2) {
          // Normal idle thoughts
          setStickmanThought(idleThoughts[Math.floor(Math.random() * idleThoughts.length)])
          setTimeout(() => setStickmanThought("..."), 3000)
        } else if (randomAction < 0.4) {
          // Arm movement
          setArmPosition("scratch")
          setTimeout(() => setArmPosition("normal"), 2000)
        } else if (randomAction < 0.6) {
          // Look around
          setIdleAnimation("look-left")
          setTimeout(() => {
            setIdleAnimation("look-right")
            setTimeout(() => setIdleAnimation(""), 1000)
          }, 1000)
        }
      }
    }, 4000)

    return () => clearInterval(idleInterval)
  }, [stickmanThought, irritationLevel])

  // Irritation slowly decreases over time
  useEffect(() => {
    const cooldownInterval = setInterval(() => {
      setIrritationLevel((prev) => Math.max(0, prev - 0.5))
    }, 5000)

    return () => clearInterval(cooldownInterval)
  }, [])

  const getRudeLevel = () => {
    if (irritationLevel < 10) return "level1"
    if (irritationLevel < 25) return "level2"
    if (irritationLevel < 40) return "level3"
    if (irritationLevel < 60) return "level4"
    return "level5"
  }

  const handleNoseClick = () => {
    setHealth((prev) => Math.max(0, prev - 8))
    setTotalClicks((prev) => prev + 1)
    setIrritationLevel((prev) => Math.min(100, prev + 8))
    setIsNosePressed(true)

    const rudeLevel = getRudeLevel()
    const responses = rudeResponses[rudeLevel]
    const response = responses[Math.floor(Math.random() * responses.length)]

    setStickmanThought(response)

    // Set mood and arm position based on irritation level
    if (irritationLevel >= 40) {
      setCurrentMood("laughing")
      setArmPosition("pointing")
      setIsLaughing(true)
    } else if (irritationLevel >= 25) {
      setCurrentMood("very_angry")
      setArmPosition("angry")
    } else if (irritationLevel >= 10) {
      setCurrentMood("angry")
      setArmPosition("angry")
    } else {
      setCurrentMood("hurt")
      setArmPosition("defensive")
    }

    setTimeout(() => {
      setIsNosePressed(false)
      setArmPosition("normal")
      setIsLaughing(false)
      setCurrentMood("neutral")
      setStickmanThought("...")
    }, 3000)
  }

  const getEyeStyle = () => {
    if (isBlinking) return { scaleY: 0.1 }
    if (currentMood === "very_angry") return { fill: "#ff0000" }
    if (currentMood === "laughing") return { scaleY: 0.3 }
    return {}
  }

  const getArmPositions = () => {
    switch (armPosition) {
      case "angry":
        return {
          leftArm: { x2: -15, y2: 10 },
          rightArm: { x2: 15, y2: 10 },
        }
      case "pointing":
        return {
          leftArm: { x2: -35, y2: 15 },
          rightArm: { x2: 35, y2: 15 },
        }
      case "defensive":
        return {
          leftArm: { x2: -10, y2: 5 },
          rightArm: { x2: 10, y2: 5 },
        }
      case "scratch":
        return {
          leftArm: { x2: -25, y2: 35 },
          rightArm: { x2: 5, y2: -5 },
        }
      default:
        return {
          leftArm: { x2: -20, y2: 30 },
          rightArm: { x2: 20, y2: 30 },
        }
    }
  }

  const arms = getArmPositions()

  const getIrritationColor = () => {
    if (irritationLevel < 10) return "bg-green-500"
    if (irritationLevel < 25) return "bg-yellow-500"
    if (irritationLevel < 40) return "bg-orange-500"
    if (irritationLevel < 60) return "bg-red-500"
    return "bg-purple-500 animate-pulse"
  }

  const getIrritationLabel = () => {
    if (irritationLevel < 10) return "Happy"
    if (irritationLevel < 25) return "Annoyed"
    if (irritationLevel < 40) return "Angry"
    if (irritationLevel < 60) return "Furious"
    return "Savage"
  }

  const getWeatherDescription = () => {
    if (irritationLevel < 5) return "☀️ Beautiful Sunny Day"
    if (irritationLevel < 15) return "🌤️ Partly Sunny"
    if (irritationLevel < 30) return "⛅ Partly Cloudy"
    if (irritationLevel < 50) return "☁️ Cloudy & Gloomy"
    return "⛈️ Dark & Stormy"
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Weather Stickman</h1>
        <p className="text-center text-gray-500 mb-8 italic">"His mood controls the weather!"</p>

        {/* Status Bars */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-red-600 w-20">Health</span>
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="h-full bg-red-500 transition-all duration-500 rounded-full"
                style={{ width: `${health}%` }}
              />
            </div>
            <span className="text-sm w-12">{health}%</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-purple-600 w-20">Mood</span>
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className={`h-full transition-all duration-500 rounded-full ${getIrritationColor()}`}
                style={{ width: `${irritationLevel}%` }}
              />
            </div>
            <span className="text-sm w-16">{getIrritationLabel()}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-blue-600 w-20">Weather</span>
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className={`h-full transition-all duration-1000 rounded-full ${
                  irritationLevel < 15 ? "bg-yellow-400" : irritationLevel < 30 ? "bg-gray-400" : "bg-gray-600"
                }`}
                style={{ width: `${100 - irritationLevel}%` }}
              />
            </div>
            <span className="text-xs w-32">{getWeatherDescription()}</span>
          </div>
        </div>

        {/* Weather status */}
        {irritationLevel < 10 && (
          <div className="mb-4 p-3 bg-yellow-100 border-2 border-yellow-300 rounded-lg text-center">
            <p className="text-yellow-800 font-semibold">☀️ Happy stickman brings sunshine!</p>
          </div>
        )}

        {irritationLevel >= 30 && irritationLevel < 50 && (
          <div className="mb-4 p-3 bg-gray-100 border-2 border-gray-300 rounded-lg text-center">
            <p className="text-gray-800 font-semibold">☁️ His anger is making it cloudy!</p>
          </div>
        )}

        {irritationLevel >= 50 && (
          <div className="mb-4 p-3 bg-gray-800 border-2 border-gray-600 rounded-lg text-center">
            <p className="text-white font-semibold">⛈️ Storm clouds gathering due to his rage!</p>
          </div>
        )}

        {/* Stickman Thought Bubble */}
        {stickmanThought !== "..." && (
          <div className="mb-4 text-center">
            <div
              className={`inline-block rounded-lg px-4 py-2 relative ${
                currentMood === "laughing" || currentMood === "teasing"
                  ? "bg-purple-100"
                  : currentMood === "very_angry" || currentMood === "angry"
                    ? "bg-red-100"
                    : currentMood === "hurt"
                      ? "bg-blue-100"
                      : currentMood === "happy"
                        ? "bg-yellow-100"
                        : "bg-gray-100"
              }`}
            >
              <p
                className={`text-sm italic font-semibold ${
                  currentMood === "laughing" || currentMood === "teasing"
                    ? "text-purple-800"
                    : currentMood === "very_angry" || currentMood === "angry"
                      ? "text-red-800"
                      : currentMood === "hurt"
                        ? "text-blue-800"
                        : currentMood === "happy"
                          ? "text-yellow-800"
                          : "text-gray-800"
                }`}
              >
                "{stickmanThought}"
              </p>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div
                  className={`w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                    currentMood === "laughing" || currentMood === "teasing"
                      ? "border-t-purple-100"
                      : currentMood === "very_angry" || currentMood === "angry"
                        ? "border-t-red-100"
                        : currentMood === "hurt"
                          ? "border-t-blue-100"
                          : currentMood === "happy"
                            ? "border-t-yellow-100"
                            : "border-t-gray-100"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* The Weather Stickman Scene */}
        <div className="flex justify-center mb-8">
          <svg
            width="400"
            height="300"
            viewBox="0 0 400 300"
            className="border rounded-lg transition-all duration-1000"
            style={{ backgroundColor: skyColor }}
          >
            {/* Sun */}
            <g opacity={sunBrightness} className="transition-opacity duration-1000">
              <circle cx="350" cy="50" r="25" fill="#FFD700" />
              {/* Sun rays */}
              <g stroke="#FFD700" strokeWidth="3" strokeLinecap="round">
                <line x1="350" y1="15" x2="350" y2="5" />
                <line x1="350" y1="95" x2="350" y2="105" />
                <line x1="315" y1="50" x2="305" y2="50" />
                <line x1="385" y1="50" x2="395" y2="50" />
                <line x1="328" y1="28" x2="321" y2="21" />
                <line x1="372" y1="72" x2="379" y2="79" />
                <line x1="372" y1="28" x2="379" y2="21" />
                <line x1="328" y1="72" x2="321" y2="79" />
              </g>
            </g>

            {/* Clouds (appear when angry) */}
            {irritationLevel >= 15 && (
              <g opacity={Math.min(1, (irritationLevel - 15) / 35)} className="transition-opacity duration-1000">
                <ellipse cx="100" cy="60" rx="30" ry="15" fill="#D3D3D3" />
                <ellipse cx="120" cy="50" rx="25" ry="12" fill="#D3D3D3" />
                <ellipse cx="80" cy="50" rx="20" ry="10" fill="#D3D3D3" />

                <ellipse cx="300" cy="80" rx="35" ry="18" fill="#D3D3D3" />
                <ellipse cx="320" cy="70" rx="28" ry="14" fill="#D3D3D3" />
                <ellipse cx="280" cy="70" rx="22" ry="11" fill="#D3D3D3" />
              </g>
            )}

            {/* Dark storm clouds (appear when very angry) */}
            {irritationLevel >= 50 && (
              <g opacity={Math.min(1, (irritationLevel - 50) / 50)} className="transition-opacity duration-1000">
                <ellipse cx="150" cy="40" rx="40" ry="20" fill="#696969" />
                <ellipse cx="170" cy="30" rx="35" ry="18" fill="#696969" />
                <ellipse cx="130" cy="30" rx="30" ry="15" fill="#696969" />

                <ellipse cx="250" cy="45" rx="45" ry="22" fill="#696969" />
                <ellipse cx="270" cy="35" rx="38" ry="19" fill="#696969" />
                <ellipse cx="230" cy="35" rx="32" ry="16" fill="#696969" />
              </g>
            )}

            {/* Ground */}
            <rect x="50" y="250" width="300" height="20" fill="#8B4513" rx="10" />

            {/* Stickman */}
            <g
              transform={`translate(200, 180) ${
                idleAnimation === "look-left" ? "rotate(-5)" : idleAnimation === "look-right" ? "rotate(5)" : ""
              } ${isLaughing ? "scale(1.1)" : "scale(1)"}`}
              className="transition-transform duration-500"
            >
              {/* Body */}
              <line x1="0" y1="0" x2="0" y2="50" stroke="#333" strokeWidth="3" strokeLinecap="round" />

              {/* Head */}
              <circle
                cx="0"
                cy="-15"
                r="15"
                fill={
                  currentMood === "very_angry"
                    ? "#FF6B6B"
                    : currentMood === "angry"
                      ? "#FFB6C1"
                      : currentMood === "happy"
                        ? "#FFE4B5"
                        : currentMood === "laughing"
                          ? "#FFE4B5"
                          : "#FFE4B5"
                }
                stroke="#333"
                strokeWidth="2"
                className="transition-colors duration-300"
              />

              {/* Eyes */}
              <ellipse
                cx="-5"
                cy="-18"
                rx="2"
                ry="2"
                fill="#333"
                style={getEyeStyle()}
                className="transition-all duration-150"
              />
              <ellipse
                cx="5"
                cy="-18"
                rx="2"
                ry="2"
                fill="#333"
                style={getEyeStyle()}
                className="transition-all duration-150"
              />

              {/* Eyebrows based on mood */}
              {currentMood === "very_angry" && (
                <>
                  <line x1="-8" y1="-22" x2="-2" y2="-19" stroke="#333" strokeWidth="3" strokeLinecap="round" />
                  <line x1="8" y1="-22" x2="2" y2="-19" stroke="#333" strokeWidth="3" strokeLinecap="round" />
                </>
              )}
              {currentMood === "angry" && (
                <>
                  <line x1="-8" y1="-22" x2="-2" y2="-20" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                  <line x1="8" y1="-22" x2="2" y2="-20" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
              {(currentMood === "laughing" || currentMood === "happy") && (
                <>
                  <path d="M -8,-22 Q -5,-24 -2,-22" stroke="#333" strokeWidth="1" fill="none" />
                  <path d="M 2,-22 Q 5,-24 8,-22" stroke="#333" strokeWidth="1" fill="none" />
                </>
              )}

              {/* The Famous Red Nose */}
              <circle
                cx="0"
                cy="-12"
                r={isNosePressed ? "5" : "3"}
                fill={currentMood === "very_angry" ? "#FF0000" : "#FF4444"}
                className="cursor-pointer transition-all duration-200 hover:fill-red-600 animate-pulse"
                onClick={handleNoseClick}
                stroke={currentMood === "very_angry" ? "#800000" : "none"}
                strokeWidth={currentMood === "very_angry" ? "2" : "0"}
              />

              {/* Mouth based on mood */}
              {currentMood === "laughing" ? (
                <path d="M -6,-6 Q 0,-2 6,-6" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
              ) : currentMood === "happy" ? (
                <path d="M -4,-8 Q 0,-5 4,-8" stroke="#333" strokeWidth="1" fill="none" />
              ) : currentMood === "very_angry" ? (
                <path d="M -6,-6 Q 0,-3 6,-6" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
              ) : currentMood === "angry" ? (
                <path d="M -4,-6 Q 0,-4 4,-6" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
              ) : currentMood === "hurt" ? (
                <path d="M -4,-5 Q 0,-8 4,-5" stroke="#333" strokeWidth="1" fill="none" />
              ) : health > 50 ? (
                <path d="M -4,-8 Q 0,-5 4,-8" stroke="#333" strokeWidth="1" fill="none" />
              ) : (
                <path d="M -4,-5 Q 0,-8 4,-5" stroke="#333" strokeWidth="1" fill="none" />
              )}

              {/* Arms */}
              <line
                x1="0"
                y1="15"
                x2={arms.leftArm.x2}
                y2={arms.leftArm.y2}
                stroke="#333"
                strokeWidth="3"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              <line
                x1="0"
                y1="15"
                x2={arms.rightArm.x2}
                y2={arms.rightArm.y2}
                stroke="#333"
                strokeWidth="3"
                strokeLinecap="round"
                className="transition-all duration-300"
              />

              {/* Legs */}
              <line x1="0" y1="50" x2="-15" y2="70" stroke="#333" strokeWidth="3" strokeLinecap="round" />
              <line x1="0" y1="50" x2="15" y2="70" stroke="#333" strokeWidth="3" strokeLinecap="round" />

              {/* Feet */}
              <ellipse cx="-15" cy="72" rx="8" ry="4" fill="#333" />
              <ellipse cx="15" cy="72" rx="8" ry="4" fill="#333" />
            </g>
          </svg>
        </div>

        {/* Weather Stats */}
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-gray-700">Nose Clicks: {totalClicks}</p>
          <p className="text-sm text-gray-500">
            {irritationLevel < 10 && "Happy stickman = Sunny weather! ☀️"}
            {irritationLevel >= 10 && irritationLevel < 25 && "Getting annoyed = Clouds forming ⛅"}
            {irritationLevel >= 25 && irritationLevel < 40 && "Angry stickman = Gloomy skies ☁️"}
            {irritationLevel >= 40 && irritationLevel < 60 && "Furious mood = Storm brewing ⛈️"}
            {irritationLevel >= 60 && "Maximum rage = Dark stormy weather! ⛈️⛈️"}
          </p>
        </div>

        {/* Mood Level Indicator */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100">
            <span className="text-sm font-semibold">Weather Mood:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                irritationLevel < 10
                  ? "bg-yellow-500"
                  : irritationLevel < 25
                    ? "bg-orange-500"
                    : irritationLevel < 40
                      ? "bg-gray-500"
                      : irritationLevel < 60
                        ? "bg-gray-700"
                        : "bg-gray-900"
              }`}
            >
              {getIrritationLabel().toUpperCase()}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center space-y-2 text-sm text-gray-600 mb-6">
          <p>👆 Click his nose to make him angry (and ruin the weather!)</p>
          <p>☀️ Keep him happy for beautiful sunny skies</p>
          <p>⛈️ Watch the weather change based on his mood</p>
          <p className="text-xs italic">The angrier he gets, the stormier it becomes!</p>
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={() => {
              setHealth(100)
              setIrritationLevel(0)
              setTotalClicks(0)
              setArmPosition("normal")
              setCurrentMood("neutral")
              setStickmanThought("Ahh, what a beautiful day! The sun is shining! ☀️")
              setTimeout(() => setStickmanThought("..."), 4000)
            }}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Reset Weather
          </button>
        </div>

        <div className="mt-4 text-center text-xs text-gray-400">Pro tip: Happy stickman = Perfect weather! ☀️</div>
      </div>
    </div>
  )
}
