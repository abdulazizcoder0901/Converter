'use client'
import React, { useEffect, useState } from 'react'
import style from '@/app/page.module.css'
import { FaCopy } from 'react-icons/fa'
import { BsCheck2All } from 'react-icons/bs'
import { MdOutlineClear } from 'react-icons/md'

export default function page() {
  const [text, setText] = useState("")
  const [convertedText, setConvertedText] = useState("")
  const [conversionLang, setConversionLang] = useState("Lotin-Krill")
  const [active, setActive] = useState(false)
  const [copy, setCopy] = useState(false)
  const [validation, setValidation] = useState(false)

  function convertToCyrilic(text) {
    const converter = {
      "A": 'A',
      'a': 'а',
      'B': 'Б',
      'b': 'б',
      "D": 'Д',
      'd': 'д',
      'E': 'Э',
      'e': 'э',
      'F': 'Ф',
      'f': 'ф',
      'G': 'Г',
      'g': 'г',
      'H': 'Х',
      'h': 'х',
      'I': 'И',
      'i': 'и',
      'J': 'Ж',
      'j': 'ж',
      'K': 'К',
      'k': 'к',
      'L': 'Л',
      'l': 'л',
      'M': 'М',
      'm': 'м',
      'N': 'Н',
      'n': 'н',
      'O': 'О',
      'o': 'о',
      'P': 'П',
      'p': 'п',
      'Q': 'К',
      'q': 'к',
      'R': 'Р',
      'r': 'р',
      'S': 'Ц',
      'g': 'г',
      's': 'ц',
      'T': 'Т',
      't': 'т',
      'U': 'У',
      'u': 'у',
      'V': 'В',
      'v': 'в',
      'X': 'Х',
      "x": 'х',
      'Y': 'Й',
      "y": 'й',
      'Z': 'З',
      'z': 'з',
      'Sh': 'Ш',
      'sh': 'ш',
      'Ch': 'Ч',
      'ch': 'ч'
    }

    return text.split('').map((char) => converter[char] || char).join('') + ' ';
  }

  function convertToLatin(text) {
    const converter = {
      "А": 'A',
      'а': 'a',
      'Б': 'B',
      'б': 'b',
      'В': 'V',
      'в': 'v',
      'Г': 'G',
      'г': 'g',
      'Д': "D",
      'д': 'd',
      'Е': 'E',
      'е': 'e',
      'Ё': 'YO',
      'ё': 'yo',
      'Ж': 'J',
      'ж': 'j',
      'З': 'Z',
      'з': 'z',
      'И': 'I',
      'и': 'i',
      'Й': 'Y',
      'й': 'y',
      'К': 'K',
      'к': 'k',
      'Л': 'L',
      'л': 'l',
      'M': 'М',
      'м': 'm',
      'Н': 'N',
      'н': 'n',
      'O': 'О',
      'о': 'o',
      'П': 'P',
      'п': 'p',
      'Р': 'R',
      'р': 'r',
      "С": 'S',
      "с": 'S',
      'T': 'Т',
      'т': 't',
      'У': 'U',
      'у': 'u',
      'Ф': 'F',
      'ф': 'f',
      'X': 'Х',
      'х': 'x',
      'Ц': 'S',
      'ц': 's',
      'Ч': 'Ch',
      'ч': 'сh',
      'Ш': 'Sh',
      'ш': 'sh',
      'Щ': 'Sh',
      'щ': 'sh',
      'Ъ': "'",
      'ъ': "'",
      'Ы': 'I',
      'ы': 'i',
      'Ь': "'",
      'ь': "'",
      'Э': 'E',
      'э': 'e',
      'Ю': 'YU',
      'ю': 'yu',
      'Я': 'YA',
      'я': 'ya',
      'f': "g'",
    }

    return text.split('').map((char) => converter[char] || char).join('') + ' ';
  }

  function handleConvert() {
    if (conversionLang === "Krill-Lotin" && text) {
      const converted = convertToLatin(text)
      setConvertedText(converted)
    } else if (conversionLang === "Lotin-Krill" && text) {
      const converted = convertToCyrilic(text)
      setConvertedText(converted)
    } else if (!text) {
      setValidation(true)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setCopy(false)
      setValidation(false)
    }, 3000)
  }, [copy, validation])

  function handleCopy() {
    if (convertedText) {
      navigator.clipboard.writeText(convertedText).then(() => {
        setCopy(true)
      })
    } else if (!convertedText) {
      alert('There is anything in the result of textarea...')
    }
  }

  return (
    <>
      {/* Main */}
      <div className={style.container}>
        <div className={style.main}>
          <div className={style['main-btns']}>
            <button onClick={() => {
              setActive(false)
              setConversionLang('Lotin-Krill')
            }} className={active ? '' : style.active}>Lotin-Krill</button>
            <button onClick={() => {
              setActive(true)
              setConversionLang('Krill-Lotin')
            }} className={active ? style.active : ""}>Krill-Lotin</button>
          </div>

          <div className={style["main-area"]}>
            <div className={style['main-left']}>
              <textarea onChange={(e) => {
                setText(e.target.value)
              }} value={text} autoFocus={true} className={validation ? style.validate : style.textarea} placeholder="Please! Enter Latin or Krill letters here..." />
              <div className={style.clearBtn} onClick={() => {
                setText("")
              }}>
                {
                  !text || <MdOutlineClear className={style.clearIcon} />
                }
              </div>
            </div>

            <div className={style["main-right"]}>
              <textarea value={convertedText} readOnly placeholder="Results..." className={style.textarea} />
              <div className={style.copy} onClick={handleCopy}>
                <button>
                  {
                    copy ? <BsCheck2All className={style.icon} /> : <FaCopy className={style.icon} />
                  }
                </button>
              </div>
            </div>
          </div>

          <div className={style["main-area__btn"]} onClick={handleConvert}>
            <button>
              Convert
            </button>
          </div>
        </div>
      </div>
      {/* Main */}
    </>
  )
}
