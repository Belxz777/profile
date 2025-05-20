"use client"

import PixelCursor from "@/components/cursor"
import type React from "react"

import { useState, useEffect, useRef } from "react"

export default function TerminalResume() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loginStep, setLoginStep] = useState(1)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [currentCommand, setCurrentCommand] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const [cursorVisible, setCursorVisible] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [terminalHeight, setTerminalHeight] = useState(500)
  const [isResizing, setIsResizing] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const resizeStartY = useRef(0)
  const initialHeight = useRef(0)
    const [loadingProgress, setLoadingProgress] = useState(0)
  const [showNamePreview, setShowNamePreview] = useState(false)


  // Resume data
  const resumeData = {
    personalInfo: {
      name: "Roman Belxz",
      phone: "8 982 124 97 32",
      email: "belxz888@gmail.com",
      telegram: "@telegram:belxz999",
      birthDate: "18.08.2007",
    },
    education: [
      {
        period: "2014 – 2023",
        institution: "МБОУ СОШ №100",
      },
      {
        period: "2021– 2025",
        institution: "ЧОУ ДПО «Академия «Калашников»",
        program: "Дополнительная образовательная программа «ИТ. Углубленный курс»",
      },
    ],
    workExperience: [
      {
        period: "2022-2025",
        position: "Простые  и не очень пет проекты ",

      },
    ],
    skills: {
      highLevel: [
        { name: "Javascript (typescript)", level: 90 },
        { name: "Python", level: 80 },
        { name: "Dart", level: 70 },
        { name: "Kotlin", level: 60 },
      ],
      lowLevel: [{ name: "C++", level: 65 }],
      tools: [
        "Docker(docker hub)",
        "Git (github,gitverse)",
        "Postman",
        "Jenkins",
        "Android studio sdk devices service",
      ],
      ide: ["Vs code", "android studio", "vs 2019"],
      other: ["unix терминалы", "postman", "docker", "nginx", "github actions (ci cd)"],
      office: ["Microsoft Access", "Word", "Excel", "PowerPoint"],
    },
    achievements: [
      "2024 г. сертификат о первом месте в хакатоне ТехноСтрелка в номинации веб технологии",
      "2024 г. благодарственное письмо от Концерна Калашников",
    ],
    hobbies: ["велоспорт", "программирование"],
    personalQualities: ["умение работать в команде", "коммуникабельность", "обучаемость", "целеустремленность"],
  }

  // Commands
  const commands = {
    help: () => {
      return [
        "📝 Доступные команды:",
        "  clear          - Очистить терминал",
        "  info           - Основная информация ℹ️",
        "  education      - Образование 🎓",
        "  experience     - Опыт работы 💼",
        "  skills         - Навыки 🛠️",
        "  achievements   - Достижения 🏆",
        "  hobbies        - Увлечения 🚴",
        "  qualities      - Личностные качества 💡",
        "  all            - Показать все резюме 📄",
        "  exit           - Выйти из системы 🚪",
      ]
    },
    clear: () => {
      setTerminalOutput([])
      return []
    },
    info: () => {
      const { personalInfo } = resumeData
      return [
        "👤 === Персональная информация ===",
        `📛 Имя:       ${personalInfo.name}`,
        `📱 Телефон:   ${personalInfo.phone}`,
        `📧 Email:     ${personalInfo.email}`,
        `✈️ Telegram:  ${personalInfo.telegram}`,
        `🎂 Дата рождения: ${personalInfo.birthDate}`,
        "",
      ]
    },
    education: () => {
      const { education } = resumeData
      const output = ["🎓 === Образование ==="]
      education.forEach((edu) => {
        output.push(`📅 ${edu.period} - ${edu.institution}`)
        if (edu.program) {
          output.push(`  📚 ${edu.program}`)
        }
      })
      output.push("")
      return output
    },
    experience: () => {
      const { workExperience } = resumeData
      const output = ["💼 === Опыт работы ==="]
      workExperience.forEach((exp) => {
        output.push(`📅 ${exp.period} - ${exp.position}`)
      })
      output.push("")
      return output
    },
    skills: () => {
      const { skills } = resumeData
      const output = ["🛠️ === Навыки ===", "-- 💻 Высокоуровневые языки:"]
      skills.highLevel.forEach((skill) => {
        output.push(`  ${skill.name} - ${'■'.repeat(skill.level/10)}${'□'.repeat(10-skill.level/10)} ${skill.level}%`)
      })
      output.push("-- 🔧 Низкоуровневые языки:")
      skills.lowLevel.forEach((skill) => {
        output.push(`  ${skill.name} - ${'■'.repeat(skill.level/10)}${'□'.repeat(10-skill.level/10)} ${skill.level}%`)
      })
      output.push("-- 🧰 Инструменты разработки:")
      skills.tools.forEach((tool) => {
        output.push(`  🔹 ${tool}`)
      })
      output.push("-- 🖥️ IDE и среды разработки:")
      skills.ide.forEach((ide) => {
        output.push(`  🔸 ${ide}`)
      })
      output.push("-- 🛠️ Другие инструменты:")
      skills.other.forEach((other) => {
        output.push(`  🔹 ${other}`)
      })
      output.push("-- 📊 Офисные программы:")
      skills.office.forEach((office) => {
        output.push(`  📌 ${office}`)
      })
      output.push("")
      return output
    },
    achievements: () => {
      const { achievements } = resumeData
      const output = ["🏆 === Достижения ==="]
      achievements.forEach((achievement, index) => {
        output.push(`🎖️ ${index + 1}. ${achievement}`)
      })
      output.push("")
      return output
    },
    hobbies: () => {
      const { hobbies } = resumeData
      const output = ["🚴 === Увлечения ==="]
      hobbies.forEach((hobby) => {
        output.push(`✨ ${hobby}`)
      })
      output.push("")
      return output
    },
    qualities: () => {
      const { personalQualities } = resumeData
      const output = ["💡 === Личностные качества ==="]
      personalQualities.forEach((quality) => {
        output.push(`⭐ ${quality}`)
      })
      output.push("")
      return output
    },
    all: () => {
      return [
        ...commands.info(),
        ...commands.education(),
        ...commands.experience(),
        ...commands.skills(),
        ...commands.achievements(),
        ...commands.hobbies(),
        ...commands.qualities(),
      ]
    },
    exit: () => {
      setTimeout(() => {
        setLoginStep(0)
        setPassword("")
        setTerminalOutput([])
        setCommandHistory([])
      }, 1000)
      return ["🚪 Выход из системы...", ""]
    },
    default: (cmd: string) => {
      return [`❌ Команда не найдена: ${cmd}`, "ℹ️ Введите 'help' для списка доступных команд", ""]
    },
  }

  // Handle key press
  const handleKeyPress = (e: KeyboardEvent) => {
    if (loginStep < 2) {
      if (e.key === "Enter") {
       if (loginStep === 1) {
          setLoginStep(2)
          const welcomeText = [
            `🌟 Добро пожаловать в мое резюме!`,
            ``,
            `💻 Терминал резюме Roman Belxz`,
            `🕒 Вы здесь и время ${new Date().toLocaleTimeString()}`,
            ``,
            `🚀 Запуск системы...`,
            `💾 Usage of /:   99.99% of 14.68GB`,
            `🧠 Memory usage: 55%`,
            `🔀 Swap usage:   32%`,
            ``,
            `⚠️ => / is using 100% of 15GB`,
            ``,
            `✅ Резюме Roman Belxz загружено и готово к просмотру.`,
            `ℹ️ Введите 'help' для списка доступных команд.`,
            ``,
            `📅 Last login: ${new Date().toLocaleString()} from ${Math.floor(Math.random() * 255)}.${Math.floor(
              Math.random() * 255,
            )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          ]
          setTerminalOutput(welcomeText)
        }
      } else if (e.key === "Backspace") {
        setPassword(password.slice(0, -1))
      } else if (e.key.length === 1) {
        setPassword(password + e.key)
      }
    } else {
      if (e.key === "Enter") {
        const cmd = currentCommand.trim().toLowerCase()
        setCommandHistory([...commandHistory, cmd])
        
        if (cmd in commands) {
          const output = (commands[cmd as keyof typeof commands] as Function)()
          setTerminalOutput([...terminalOutput, `roman@belxz-resume:~$ ${currentCommand}`, ...output])
        } else if (cmd) {
          setTerminalOutput([...terminalOutput, `roman@belxz-resume:~$ ${currentCommand}`, ...commands.default(cmd)])
        } else {
          setTerminalOutput([...terminalOutput, `roman@belxz-resume:~$ `])
        }

        setCurrentCommand("")
      } else if (e.key === "Backspace") {
        setCurrentCommand(currentCommand.slice(0, -1))
      } else if (e.key === " " && terminalOutput.some((line) => line.includes("[Space]"))) {
        setTerminalOutput(terminalOutput.filter((line) => !line.includes("[Space]")))
      } else if (e.key.length === 1) {
        setCurrentCommand(currentCommand + e.key)
      }
    }

    if (terminalRef.current) {
      setTimeout(() => {
        terminalRef.current!.scrollTop = terminalRef.current!.scrollHeight
      }, 0)
    }
  }

  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    resizeStartY.current = e.clientY
    initialHeight.current = terminalHeight
  }

  // Handle resize move
  useEffect(() => {
    const handleResizeMove = (e: MouseEvent) => {
      if (!isResizing) return

      const deltaY = e.clientY - resizeStartY.current
      const newHeight = Math.max(200, initialHeight.current + deltaY)
      setTerminalHeight(newHeight)
    }

    const handleResizeEnd = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      window.addEventListener("mousemove", handleResizeMove)
      window.addEventListener("mouseup", handleResizeEnd)
    }

    return () => {
      window.removeEventListener("mousemove", handleResizeMove)
      window.removeEventListener("mouseup", handleResizeEnd)
    }
  }, [isResizing])

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
     setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  // Add event listeners
  useEffect(() => {
    setIsLoaded(true)
    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [loginStep, password, currentCommand, terminalOutput])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

 useEffect(() => {
    if (loginStep === 1) {
      const loadingInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(loadingInterval)
            return 100
          }
          return prev + 10
        })
      }, 400)
      setCursorVisible((prev) => !prev)

      return () => clearInterval(loadingInterval)
    }
  }, [loginStep])

  // Show name preview after loading
  useEffect(() => {
    if (loadingProgress === 100) {
      setShowNamePreview(true)
      setTimeout(() => {
        setShowNamePreview(false)
        setLoginStep(2)
      }, 2000)
    }
  }, [loadingProgress])

  // Modified welcome text with loading animation
  const welcomeText = [
    `🌟 Добро пожаловать в мое резюме!`,
    ``,
    `💻 Терминал резюме Roman Belxz`,
    `🕒 Вы здесь и время ${new Date().toLocaleTimeString()}`,
    ``,
    `🚀 Запуск системы...`,
    `[${'='.repeat(loadingProgress / 10)}${' '.repeat(10 - loadingProgress / 10)}] ${loadingProgress}%`,
    ``,
    loadingProgress === 100 ? `✅ Система успешно загружена` : `⚙️ Инициализация подсистем...`,
    ``,
    `📅 История входов: ${new Date().toLocaleString()} from ${Math.floor(Math.random() * 255)}.${Math.floor(
      Math.random() * 255,
    )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  ]

  // Update terminal output when loading progresses
  useEffect(() => {
    if (loginStep === 1 && loadingProgress > 0) {
      setTerminalOutput(welcomeText)
    }
  }, [loadingProgress])
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
       {showNamePreview && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90">
          <div className="text-5xl md:text-7xl font-bold text-center">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
              <div className="transform perspective-1000 rotate-x-20">
                ROMAN BELXZ
              </div>
              <div className="text-lg mt-4 text-gray-400">Full Stack Developer</div>
            </div>
          </div>
        </div>
      )}
      <PixelCursor mousePosition={mousePosition} />
      <div
        className={`terminal-container `}
        style={{
          width: expanded ? "100%" : "800px",
          maxWidth: "100%",
        }}
      >
        {/* Terminal header */}
        <div className="terminal-header">
          <div className="terminal-buttons">
            <div className="terminal-button red"></div>
            <div className="terminal-button yellow"></div>
            <div className="terminal-button green"></div>
          </div>
          <div className="terminal-title">roman@belxz-resume:~</div>
          <div className="terminal-controls">
            <button 
              className="terminal-control-button"
              onClick={() => setExpanded(!expanded)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {expanded ? (
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                ) : (
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className="terminal-content"
          style={{
            height: expanded ? "calc(100vh - 40px)" : `${terminalHeight}px`,
          }}
        >
          {terminalOutput.map((line, index) => (
            <div key={index} className="terminal-line fade-in">
              {line}
            </div>
          ))}
          
          {loginStep === 0 && (
            <div className="terminal-input-line">
              <span className="text-green-400">roman@desktop:~$ </span>
              <span className="terminal-input">{currentCommand}</span>
              <span className={`terminal-cursor ${cursorVisible ? "visible" : "hidden"}`}></span>
            </div>
          )}
          
          {loginStep === 1 && (
            <div className="terminal-input-line">
              <span className="text-purple-400">roman@belxz-resume.ru's password: </span>
              <span className="terminal-input">{showPassword ? password : "*".repeat(password.length)}</span>
              <span className={`terminal-cursor ${cursorVisible ? "visible" : "hidden"}`}></span>
            </div>
          )}
          
          {loginStep === 2 && (
            <div className="terminal-input-line">
              <span className="text-green-400">roman@belxz-resume:~$ </span>
              <span className="terminal-input">{currentCommand}</span>
              <span className={`terminal-cursor ${cursorVisible ? "visible" : "hidden"}`}></span>
            </div>
          )}
        </div>

        {/* Resize handle */}
        <div 
          className="terminal-resize-handle"
          onMouseDown={handleResizeStart}
        >
          <div className="terminal-resize-indicator"></div>
        </div>
      </div>
    </div>
  )
}