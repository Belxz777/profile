"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useDragControls } from "framer-motion"

export default function TerminalResume() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loginStep, setLoginStep] = useState(0)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [currentCommand, setCurrentCommand] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const [cursorVisible, setCursorVisible] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const terminalRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()

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
        period: "2024 – 2025",
        institution: "ЧОУ ДПО «Академия «Калашников»",
        program: "Дополнительная образовательная программа «Аэро. Углубленный курс»",
      },
    ],
    workExperience: [
      {
        period: "2024",
        position: "Слесарь механосборочных работ",
        company: "______________",
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
        "Доступные команды:",
        "  help           - Показать список команд",
        "  clear          - Очистить терминал",
        "  info           - Основная информация",
        "  education      - Образование",
        "  experience     - Опыт работы",
        "  skills         - Навыки",
        "  achievements   - Достижения",
        "  hobbies        - Увлечения",
        "  qualities      - Личностные качества",
        "  all            - Показать все резюме",
        "  exit           - Выйти из системы",
        "",
        "Нажмите [Space] для продолжения...",
      ]
    },
    clear: () => {
      setTerminalOutput([])
      return []
    },
    info: () => {
      const { personalInfo } = resumeData
      return [
        "=== Персональная информация ===",
        `Имя:       ${personalInfo.name}`,
        `Телефон:   ${personalInfo.phone}`,
        `Email:     ${personalInfo.email}`,
        `Telegram:  ${personalInfo.telegram}`,
        `Дата рождения: ${personalInfo.birthDate}`,
        "",
      ]
    },
    education: () => {
      const { education } = resumeData
      const output = ["=== Образование ==="]
      education.forEach((edu) => {
        output.push(`${edu.period} - ${edu.institution}`)
        if (edu.program) {
          output.push(`  ${edu.program}`)
        }
      })
      output.push("")
      return output
    },
    experience: () => {
      const { workExperience } = resumeData
      const output = ["=== Опыт работы ==="]
      workExperience.forEach((exp) => {
        output.push(`${exp.period} - ${exp.position}`)
        output.push(`  Компания: ${exp.company}`)
      })
      output.push("")
      return output
    },
    skills: () => {
      const { skills } = resumeData
      const output = ["=== Навыки ===", "-- Высокоуровневые языки:"]
      skills.highLevel.forEach((skill) => {
        output.push(`  ${skill.name} - ${skill.level}%`)
      })
      output.push("-- Низкоуровневые языки:")
      skills.lowLevel.forEach((skill) => {
        output.push(`  ${skill.name} - ${skill.level}%`)
      })
      output.push("-- Инструменты разработки:")
      skills.tools.forEach((tool) => {
        output.push(`  ${tool}`)
      })
      output.push("-- IDE и среды разработки:")
      skills.ide.forEach((ide) => {
        output.push(`  ${ide}`)
      })
      output.push("-- Другие инструменты:")
      skills.other.forEach((other) => {
        output.push(`  ${other}`)
      })
      output.push("-- Офисные программы:")
      skills.office.forEach((office) => {
        output.push(`  ${office}`)
      })
      output.push("")
      return output
    },
    achievements: () => {
      const { achievements } = resumeData
      const output = ["=== Достижения ==="]
      achievements.forEach((achievement, index) => {
        output.push(`${index + 1}. ${achievement}`)
      })
      output.push("")
      return output
    },
    hobbies: () => {
      const { hobbies } = resumeData
      const output = ["=== Увлечения ==="]
      hobbies.forEach((hobby) => {
        output.push(`- ${hobby}`)
      })
      output.push("")
      return output
    },
    qualities: () => {
      const { personalQualities } = resumeData
      const output = ["=== Личностные качества ==="]
      personalQualities.forEach((quality) => {
        output.push(`- ${quality}`)
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
      return ["Выход из системы...", ""]
    },
    default: (cmd: string) => {
      return [`Команда не найдена: ${cmd}`, "Введите 'help' для списка доступных команд", ""]
    },
  }

  // Handle key press
  const handleKeyPress = (e: KeyboardEvent) => {
    if (loginStep < 2) {
      if (e.key === "Enter") {
        if (loginStep === 0) {
          setLoginStep(1)
          setTerminalOutput([
            ...terminalOutput,
            `roman@desktop:~$ ssh roman@belxz-resume.ru`,
            `roman@belxz-resume.ru's password: ${showPassword ? password : "*".repeat(password.length)}`,
          ])
          setPassword("")
        } else if (loginStep === 1) {
          setLoginStep(2)
          const welcomeText = [
            `Welcome to Ubuntu 24.04.2 LTS (GNU/Linux 6.8.0-53-generic x86_64)`,
            ``,
            `* Documentation:  https://help.ubuntu.com`,
            `* Management:     https://landscape.canonical.com`,
            `* Support:        https://ubuntu.com/pro`,
            ``,
            `System information as of ${new Date().toLocaleString()}`,
            ``,
            `System load:  0.00                Processes:             133`,
            `Usage of /:   85.1% of 14.68GB    Users logged in:       1`,
            `Memory usage: 55%                 IPv4 address for eth0: 81.200.158.11`,
            `Swap usage:   0%`,
            ``,
            `=> / is using 85.1% of 14.68GB`,
            ``,
            `* Резюме Roman Belxz загружено и готово к просмотру.`,
            `* Введите 'help' для списка доступных команд.`,
            ``,
            `Last login: ${new Date().toLocaleString()} from ${Math.floor(Math.random() * 255)}.${Math.floor(
              Math.random() * 255,
            )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            `roman@belxz-resume:~$ `,
          ]
          setTerminalOutput([
            ...terminalOutput,
            `Permission denied, please try again.`,
            `roman@belxz-resume.ru's password: `,
            ...welcomeText,
          ])
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
        setTerminalOutput([...terminalOutput, `roman@belxz-resume:~$ ${currentCommand}`])

        if (cmd in commands) {
          const output = (commands[cmd as keyof typeof commands] as () => string[])()
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
        // Handle space bar for pagination
        setTerminalOutput(terminalOutput.filter((line) => !line.includes("[Space]")))
      } else if (e.key.length === 1) {
        setCurrentCommand(currentCommand + e.key)
      }
    }

    // Scroll to bottom
    if (terminalRef.current) {
      setTimeout(() => {
        terminalRef.current!.scrollTop = terminalRef.current!.scrollHeight
      }, 0)
    }
  }
  // Function to start drag
  const startDrag = (event: React.PointerEvent) => {
    dragControls.start(event, { snapToCursor: false })
  }

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

  // Initial terminal text with welcome message
  useEffect(() => {
    if (isLoaded && terminalOutput.length === 0) {
      const initialMessage = [
        "╔════════════════════════════════════════════════════════════════╗",
        "║                                                                ║",
        "║   Добро пожаловать в интерактивное терминальное резюме!        ║",
        "║                                                                ║",
        "║   • Нажмите Enter для начала работы                            ║",
        "║   • Вы можете перемещать это окно, перетаскивая его заголовок  ║",
        "║   • Используйте кнопку в правом верхнем углу для               ║",
        "║     разворачивания терминала на весь экран                     ║",
        "║                                                                ║",
        "╚════════════════════════════════════════════════════════════════╝",
        "",
        "roman@desktop:~$ ",
      ]
      setTerminalOutput(initialMessage)
    }
  }, [isLoaded, terminalOutput])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        className={`bg-[#300a24] text-white font-mono rounded-lg overflow-hidden shadow-2xl ${
          expanded ? "w-full h-full fixed top-0 left-0 z-50" : "w-[800px] max-w-full"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          x: expanded ? 0 : position.x,
          y: expanded ? 0 : position.y,
        }}
        drag={!expanded}
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0}
        onDragEnd={(_event: any, info: { offset: { x: number; y: number } }) => {
          setPosition({ x: position.x + info.offset.x, y: position.y + info.offset.y })
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal header */}
        <div className="bg-[#3c3c3c] px-4 py-2 flex justify-between items-center cursor-move" onPointerDown={startDrag}>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-gray-300">roman@belxz-resume:~</div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {expanded ? (
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
                  <polyline points="4 14 10 14 10 20"></polyline>
                  <polyline points="20 10 14 10 14 4"></polyline>
                  <line x1="14" y1="10" x2="21" y2="3"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              ) : (
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
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              )}
            </button>
            <button className="text-gray-300 hover:text-white focus:outline-none">
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className={`p-4 overflow-auto ${expanded ? "h-[calc(100vh-40px)]" : "h-[500px]"}`}
          style={{ whiteSpace: "pre-wrap" }}
        >
          <AnimatePresence>
            {terminalOutput.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="leading-tight"
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>
          {loginStep === 0 && (
            <span className="inline-block">
              {currentCommand}
              <span
                className={`inline-block w-2 h-4 bg-white ml-0.5 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
              ></span>
            </span>
          )}
          {loginStep === 1 && (
            <span className="inline-block">
              {showPassword ? password : "*".repeat(password.length)}
              <span
                className={`inline-block w-2 h-4 bg-white ml-0.5 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
              ></span>
            </span>
          )}
          {loginStep === 2 && (
            <span className="inline-block">
              {currentCommand}
              <span
                className={`inline-block w-2 h-4 bg-white ml-0.5 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
              ></span>
            </span>
          )}
        </div>
      </motion.div>
    </div>
  )
}
