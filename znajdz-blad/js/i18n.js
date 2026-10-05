/* Interface copy. Polish is the default. Russian is used only after the RU switch. */
window.ZB_I18N = {
  pl: {
    docTitle: "ZNAJDŹ BŁĄD — Misja matematyczna",
    phases: ["START", "MISJA 1", "ŚLEDZTWO", "MISJA 2", "MYŚLENIE", "FINAŁ"],
    progressAria: "Postęp misji, krok",
    of6: "z 6",
    back: "← Wstecz",
    catalogBack: "← Zadania",
    noteLabel: "Notatka — nieobowiązkowa",
    notePlaceholder: "Tutaj możesz zapisać swoją myśl…",
    selected: "✓ Zaznaczone",
    clueHint: "Zaznacz jedno lub kilka miejsc. Nie mówimy, czy wybór jest dobry.",
    thinkLead: "Odpowiadaj po kolei. Możesz napisać albo tylko pomyśleć.",
    nextQuestion: "NASTĘPNE PYTANIE →",
    finishThink: "ZAKOŃCZ ŚLEDZTWO →",
    qOf: "Pytanie",
    qOfMid: "z",
    mapTitle: "Mapa miejsc, w których szukamy błędu",
    seal: "BRAWO",
    evidence1: "DOWÓD NR 1",
    evidence2: "DOWÓD NR 2",
    mulLabel: "347 × 26",
    divLabel: "936 : 24 = ?",

    s1title: "ZNAJDŹ BŁĄD",
    s1sub: "Misja matematyczna",
    s1p1: "Komputer sprawdza obliczenia...",
    s1p2: "ale ktoś popełnił błąd.",
    s1p3: "Twoim zadaniem jest znaleźć miejsce, w którym wszystko poszło nie tak.",
    s1btn: "ROZPOCZNIJ MISJĘ →",

    s2title: "MISJA 1 — MNOŻENIE",
    s2p1: "Rozwiąż przykład samodzielnie na kartce lub w zeszycie.",
    s2p2: "Nie wpisuj tylko wyniku.",
    s2p3: "jak myślisz i jak wykonujesz obliczenia",
    s2p3before: "Chcemy zobaczyć,",
    s2ready: "Gotowe? Kliknij „Rozwiązałem”.",
    s2btn: "✓ ROZWIĄZAŁEM",

    s3title: "TERAZ CZAS NA ŚLEDZTWO",
    s3p1: "Nie pokazujemy jeszcze poprawnego wyniku.",
    s3p2: "Sprawdź swoje rozwiązanie krok po kroku.",
    s3p3: "Gdzie mogło pojawić się potknięcie?",
    s3btn: "DALEJ →",

    s4title: "MISJA 2 — DZIELENIE",
    s4p1: "Rozwiąż działanie samodzielnie.",
    s4p2: "Zapisz całe rozwiązanie na kartce lub w zeszycie.",
    s4p3: "Nie podawaj tylko wyniku.",
    s4btn: "✓ ROZWIĄZAŁEM",

    s5title: "POKAŻ, JAK MYŚLISZ",
    questions: [
      "Od czego zacząłeś?",
      "Dlaczego wybrałeś właśnie tę część liczby?",
      "Jak otrzymałeś pierwszą cyfrę wyniku?",
      "Jak sprawdziłeś swój wynik?"
    ],

    s6title: "MISJA ZAKOŃCZONA!",
    s6p1: "Świetna robota!",
    s6p2: "Dzisiaj nie chodziło tylko o znalezienie poprawnej odpowiedzi.",
    s6p3: "Ćwiczyłeś coś ważniejszego:",
    s6key: "znajdowanie miejsca, w którym pojawia się błąd.",
    s6btn: "🔄 SPRÓBUJ JESZCZE RAZ",

    cards: [
      { id: "units", title: "JEDNOŚCI", hint: "Pierwszy krok: cyfra jedności" },
      { id: "tens", title: "DZIESIĄTKI", hint: "Drugi krok: cyfra dziesiątek" },
      { id: "carry", title: "PRZENIESIENIE", hint: "Małe cyfry, które przenosisz" },
      { id: "shift", title: "PRZESUNIĘCIE DRUGIEGO WIERSZA", hint: "Gdzie stoi drugi wiersz" }
    ],
    chainMul: ["MNOŻENIE", "jedności", "dziesiątki", "przeniesienie", "przesunięcie"],
    chainDiv: ["DZIELENIE", "wybór części liczby", "pierwsza cyfra", "kolejne kroki", "sprawdzenie wyniku"]
  },

  ru: {
    docTitle: "НАЙДИ ОШИБКУ — Математическая миссия",
    phases: ["СТАРТ", "МИССИЯ 1", "СЛЕДСТВИЕ", "МИССИЯ 2", "МЫШЛЕНИЕ", "ФИНАЛ"],
    progressAria: "Прогресс миссии, шаг",
    of6: "из 6",
    back: "← Назад",
    catalogBack: "← Задания",
    noteLabel: "Заметка — необязательно",
    notePlaceholder: "Здесь можно записать свою мысль…",
    selected: "✓ Отмечено",
    clueHint: "Отметь одно или несколько мест. Мы не говорим, хороший ли это выбор.",
    thinkLead: "Отвечай по очереди. Можно написать или просто подумать.",
    nextQuestion: "СЛЕДУЮЩИЙ ВОПРОС →",
    finishThink: "ЗАВЕРШИТЬ СЛЕДСТВИЕ →",
    qOf: "Вопрос",
    qOfMid: "из",
    mapTitle: "Карта мест, где ищем ошибку",
    seal: "БРАВО",
    evidence1: "УЛИКА № 1",
    evidence2: "УЛИКА № 2",
    mulLabel: "347 × 26",
    divLabel: "936 : 24 = ?",

    s1title: "НАЙДИ ОШИБКУ",
    s1sub: "Математическая миссия",
    s1p1: "Компьютер проверяет вычисления...",
    s1p2: "но кто-то допустил ошибку.",
    s1p3: "Твоя задача — найти место, где всё пошло не так.",
    s1btn: "НАЧАТЬ МИССИЮ →",

    s2title: "МИССИЯ 1 — УМНОЖЕНИЕ",
    s2p1: "Реши пример самостоятельно на листочке или в тетради.",
    s2p2: "Не записывай только ответ.",
    s2p3: "как ты думаешь и как считаешь",
    s2p3before: "Мы хотим увидеть,",
    s2ready: "Готово? Нажми «Я решил».",
    s2btn: "✓ Я РЕШИЛ",

    s3title: "ТЕПЕРЬ ВРЕМЯ РАССЛЕДОВАНИЯ",
    s3p1: "Правильный результат мы пока не показываем.",
    s3p2: "Проверь своё решение шаг за шагом.",
    s3p3: "Где мог появиться сбой?",
    s3btn: "ДАЛЬШЕ →",

    s4title: "МИССИЯ 2 — ДЕЛЕНИЕ",
    s4p1: "Реши пример самостоятельно.",
    s4p2: "Запиши всё решение на листочке или в тетради.",
    s4p3: "Не указывай только ответ.",
    s4btn: "✓ Я РЕШИЛ",

    s5title: "ПОКАЖИ, КАК ТЫ ДУМАЕШЬ",
    questions: [
      "С чего ты начал?",
      "Почему ты выбрал именно эту часть числа?",
      "Как ты получил первую цифру результата?",
      "Как ты проверил свой результат?"
    ],

    s6title: "МИССИЯ ЗАВЕРШЕНА!",
    s6p1: "Отличная работа!",
    s6p2: "Сегодня дело было не только в том, чтобы найти правильный ответ.",
    s6p3: "Ты тренировал кое-что важнее:",
    s6key: "находить место, где появляется ошибка.",
    s6btn: "🔄 ПОПРОБОВАТЬ ЕЩЁ РАЗ",

    cards: [
      { id: "units", title: "ЕДИНИЦЫ", hint: "Первый шаг: цифра единиц" },
      { id: "tens", title: "ДЕСЯТКИ", hint: "Второй шаг: цифра десятков" },
      { id: "carry", title: "ПЕРЕНОС", hint: "Маленькие цифры, которые переносишь" },
      { id: "shift", title: "СДВИГ ВТОРОЙ СТРОКИ", hint: "Где стоит вторая строка" }
    ],
    chainMul: ["УМНОЖЕНИЕ", "единицы", "десятки", "перенос", "сдвиг"],
    chainDiv: ["ДЕЛЕНИЕ", "выбор части числа", "первая цифра", "следующие шаги", "проверка результата"]
  }
};
