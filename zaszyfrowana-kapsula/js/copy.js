/* Tekst misji dla Kirilla. Rozwiązania sprawdzane są w app.js i nie pojawiają się przed próbą. */
window.KAPSULA_COPY = {
  pl: {
    brand: "MISJA",
    docTitle: "Zaszyfrowana kapsuła",
    back: "← Zadania",
    kicker: "Tajemnica podróży w czasie",
    title: "Zaszyfrowana kapsuła",
    intro: [
      "Znalazłeś zaszyfrowaną kapsułę.",
      "W środku jest uszkodzona wiadomość o nieznanej podróży.",
      "Trzeba ustalić, kto ją wysłał, jakim kluczem zamknął zamek, skąd nadszedł sygnał i dokąd prowadzi stempel."
    ],
    progress: "Fragmenty",
    left: "Zostało prób",
    mapLabel: "Mapa misji",
    locked: "Najpierw złóż poprzedni fragment.",
    reward: "Po tej próbie wróci jeden fragment wiadomości.",
    got: "Fragment wiadomości",
    step: "Krok",
    check: "Sprawdź",
    openTask: "Otwórz zadanie",
    keyBtn: "Wpisz klucz",
    keyPh: "wynik",
    again: "Od nowa",
    finaleKicker: "Złóż wiadomość",
    finaleTitle: "Masz cztery fragmenty.",
    finaleLead: "Ułóż je w jedną wiadomość. Zamek otworzy się, gdy każdy trafi na swoje miejsce.",
    placeBad: "Ten fragment tu nie pasuje.",
    openTitle: "Kapsuła otwarta",
    joined: "Dzisiaj połączyłeś matematykę, język polski, angielski i historię, żeby rozwiązać jedną zagadkę.",
    skills: ["Myślenie", "Spostrzegawczość", "Wiedza", "Rozwiązywanie problemów"],
    bonus: "Chcesz zobaczyć prawdziwy kamień, od którego odczytano hieroglify?",
    scenes: {
      matematyka: "Komputer kapsuły zatrzymał się. Ktoś pomylił się w zapisie.",
      polski: "W kapsule leży podarty dokument. Część słów trzeba rozpoznać i wpisać z powrotem.",
      angielski: "Kapsuła łapie urwane nagranie. Słychać pojazdy, miasto i rzekę.",
      historia: "Na stemplu są symbole dawnych cywilizacji. Archiwum pomoże je rozpoznać.",
      final: "Cztery fragmenty czekają. Złóż z nich wiadomość."
    },
    slots: [
      { id: "who", label: "Kto ją zostawił?" },
      { id: "key", label: "Jaki klucz otwiera zamek?" },
      { id: "from", label: "Skąd nadszedł sygnał?" },
      { id: "to", label: "Dokąd prowadzi stempel?" }
    ],
    blanks: [
      "_____ otworzył kapsułę kluczem _____.",
      "Sygnał przyszedł z _____.",
      "Stempel prowadzi do _____."
    ],
    stages: {
      matematyka: {
        icon: "🖥",
        subject: "Matematyka",
        name: "Zamek komputera",
        story: "Komputer pokazuje podejrzane mnożenie. Najpierw znajdź błąd w zapisie. Potem zamek poprosi o poprawny wynik tego mnożenia. Wynik jest kluczem, bo błędna liczba zamka nie otworzy.",
        task: [
          "Wejdź w zadanie i znajdź miejsce pomyłki.",
          "Rozwiązanie zapisz na kartce.",
          "Gdy wrócisz, wpisz poprawny wynik mnożenia 347 × 26."
        ],
        wait: "Zamek jeszcze nie słucha. Najpierw dokończ zadanie przy komputerze.",
        keyLead: "Zadanie jest zrobione. Zamek prosi o poprawny wynik mnożenia, które naprawiałeś: 347 × 26.",
        keyBad: "Zamek milczy. Sprawdź na kartce jeszcze raz ten iloczyn. Wpisz wynik, nie miejsce błędu."
      },
      polski: {
        icon: "📜",
        subject: "Język polski",
        name: "Podarty dokument",
        story: "Dokument z kapsuły jest przedarty. Żeby wrócił sens, rozpoznaj rzeczowniki, ich rodzaj i formę oraz poprawny zapis z „nie”.",
        steps: [
          {
            type: "multi",
            title: "Znajdź rzeczowniki",
            lead: "W zdaniu część słów to rzeczowniki, a część nie. Zaznacz same rzeczowniki.",
            sentence: "Stary podróżnik zostawił tajną kapsułę w mieście.",
            choices: [
              { id: "stary", label: "stary" },
              { id: "podroznik", label: "podróżnik" },
              { id: "zostawil", label: "zostawił" },
              { id: "tajna", label: "tajną" },
              { id: "kapsula", label: "kapsułę" },
              { id: "miasto", label: "mieście" }
            ],
            correct: ["podroznik", "kapsula", "miasto"],
            ok: "Nazwy osoby, rzeczy i miejsca wracają na dokument.",
            bad: "Jeszcze nie. Rzeczownik nazywa osobę, rzecz albo miejsce. Czasownik i przymiotnik zostaw."
          },
          {
            type: "bins",
            title: "Jaki to rodzaj?",
            lead: "Przypisz każdy rzeczownik do rodzaju.",
            bins: [
              { id: "m", label: "rodzaj męski" },
              { id: "z", label: "rodzaj żeński" },
              { id: "n", label: "rodzaj nijaki" }
            ],
            items: [
              { id: "podroznik", label: "podróżnik", bin: "m" },
              { id: "kapsula", label: "kapsuła", bin: "z" },
              { id: "miasto", label: "miasto", bin: "n" }
            ],
            ok: "Rodzaje stoją przy słowach.",
            bad: "Któryś rodzaj nie pasuje. Sprawdź jeszcze raz: kto, co."
          },
          {
            type: "one",
            title: "Która forma pasuje?",
            lead: "Uzupełnij zdanie. Kto zostawił wiadomość?",
            sentence: "Wiadomość zostawił _____.",
            choices: [
              { id: "mian", label: "podróżnik" },
              { id: "dop", label: "podróżnika" },
              { id: "narz", label: "podróżnikiem" }
            ],
            correct: "mian",
            ok: "Zdanie ma podmiot. Dokument czyta się dalej.",
            bad: "Ta forma nie pasuje do pytania „kto?”. Szukaj mianownika."
          },
          {
            type: "groups",
            title: "Jak zapisać „nie”?",
            lead: "Na dokumencie rozmazał się zapis. Wybierz poprawną pisownię.",
            groups: [
              {
                id: "kaps",
                prompt: "Partykuła „nie” przed rzeczownikiem kapsuła:",
                correct: "osobno",
                choices: [
                  { id: "osobno", label: "nie kapsuła" },
                  { id: "razem", label: "niekapsuła" },
                  { id: "lacznik", label: "nie-kapsuła" }
                ]
              },
              {
                id: "wrog",
                prompt: "Słowo oznaczające wroga:",
                correct: "jeden",
                choices: [
                  { id: "jeden", label: "nieprzyjaciel" },
                  { id: "dwa", label: "nie przyjaciel" },
                  { id: "lacznik", label: "nie-przyjaciel" }
                ]
              }
            ],
            ok: "Zapis jest czysty. Dokument znowu da się czytać.",
            bad: "Jeden zapis jeszcze się rozmazuje. Sprawdź obie linijki."
          }
        ]
      },
      angielski: {
        icon: "📻",
        subject: "Język angielski",
        name: "Sygnał z miasta",
        story: "Nagranie jest po angielsku. Rozpoznaj pojazdy, odtwórz trasę i znak przy rzece.",
        steps: [
          {
            type: "signal",
            title: "Co słyszysz?",
            lead: "Radio podaje jedną nazwę. Wskaż pojazd.",
            rounds: [
              { say: "bus", correct: "bus", choices: ["bus", "plane", "ship", "taxi"] },
              { say: "bike", correct: "bike", choices: ["bike", "tram", "car", "train"] },
              { say: "cable car", correct: "cable", choices: ["cable", "motorbike", "plane", "bus"] },
              { say: "helicopter", correct: "heli", choices: ["heli", "boat", "taxi", "tram"] },
              { say: "boat", correct: "boat", choices: ["boat", "car", "train", "bike"] },
              { say: "tram", correct: "tram", choices: ["tram", "ship", "motorbike", "heli"] }
            ],
            icons: {
              bus: "🚌", train: "🚆", taxi: "🚕", bike: "🚲", motorbike: "🏍️",
              cable: "🚠", plane: "✈️", heli: "🚁", car: "🚗", boat: "⛵", ship: "🚢", tram: "🚊"
            },
            names: {
              bus: "bus", train: "train", taxi: "taxi", bike: "bike", motorbike: "motorbike",
              cable: "cable car", plane: "plane", heli: "helicopter", car: "car", boat: "boat", ship: "ship", tram: "tram"
            },
            ok: "Nazwy pojazdów są czyste.",
            bad: "To inny pojazd. Posłuchaj słowa jeszcze raz."
          },
          {
            type: "flags",
            title: "Wiadomość Sally",
            lead: "Odczytaj nagranie i oceń zdania.",
            text: "Hi! I'm Sally. I get around London on a red double-decker bus. Then I do a bike tour and check out the sights.",
            items: [
              { id: "a", text: "Najpierw Sally jedzie czerwonym piętrowym autobusem.", ok: true },
              { id: "b", text: "Najpierw leci helikopterem.", ok: false },
              { id: "c", text: "Ogląda atrakcje miasta.", ok: true }
            ],
            yes: "Prawda",
            no: "Fałsz",
            ok: "Pierwsza część trasy wraca.",
            bad: "Któreś zdanie nie zgadza się z nagraniem. Wróć do tekstu."
          },
          {
            type: "one",
            title: "Co jest łagodniejsze dla miasta?",
            lead: "Dalsza część nagrania:",
            text: "Later I take the cable car. I skip the helicopter tour. A cruise along the River Thames is more environmentally friendly.",
            sentence: "Co Sally wybiera jako bardziej environmentally friendly?",
            choices: [
              { id: "heli", label: "helicopter tour" },
              { id: "cruise", label: "cruise along the River Thames" }
            ],
            correct: "cruise",
            ok: "Sygnał odrzuca głośny lot. Zostaje rzeka.",
            bad: "W nagraniu jest inaczej. Sprawdź, który przejazd Sally zostawia."
          },
          {
            type: "one",
            title: "Znak przy rzece",
            lead: "Na nagraniu widać znak. Co on mówi podróżującemu?",
            sign: "THAMES CRUISE",
            choices: [
              { id: "fly", label: "lecieć helikopterem" },
              { id: "river", label: "popłynąć w rejs po rzece" },
              { id: "train", label: "wsiąść w pociąg pod ziemią" }
            ],
            correct: "river",
            ok: "Znak odczytany. Trasa ma już koniec.",
            bad: "Ten znak nie mówi o tym pojeździe. Przeczytaj napis jeszcze raz."
          }
        ]
      },
      historia: {
        icon: "🏛",
        subject: "Historia",
        name: "Archiwum cywilizacji",
        story: "Stempel porównasz z archiwum działu o starożytnych cywilizacjach. Kilka śladów, nie długa kartkówka.",
        steps: [
          {
            type: "order",
            title: "Ułóż epoki",
            lead: "Od najdawniejszej.",
            items: [
              { id: "b", label: "epoka brązu" },
              { id: "z", label: "epoka żelaza" },
              { id: "k", label: "epoka kamienia" }
            ],
            correct: ["k", "b", "z"],
            ok: "Oś czasu stoi prosto.",
            bad: "Kolejność jeszcze skacze. Pomyśl, która epoka była najdawniejsza."
          },
          {
            type: "one",
            title: "Wielka zmiana",
            lead: "Ludzie zaczęli uprawiać rolę i mieszkać w jednym miejscu. Jak nazywa się ta zmiana?",
            choices: [
              { id: "neo", label: "rewolucja neolityczna" },
              { id: "zel", label: "wynalezienie żelaza" },
              { id: "ham", label: "kodeks Hammurabiego" }
            ],
            correct: "neo",
            ok: "Archiwum rozpoznaje początek osad.",
            bad: "To inne wydarzenie. Szukaj zmiany związanej z uprawą roli."
          },
          {
            type: "match",
            title: "Połącz ślad z cywilizacją",
            lead: "Dotknij śladu, potem cywilizacji.",
            pairs: [
              { id: "h", left: "hieroglify", right: "Egipt" },
              { id: "k", left: "pismo klinowe", right: "Mezopotamia" },
              { id: "ham", left: "kodeks Hammurabiego", right: "Mezopotamia" },
              { id: "b", left: "wiara w jednego Boga", right: "Izrael" },
              { id: "i", left: "dolina Indusu", right: "Indie" }
            ],
            ok: "Ślady mają swoich właścicieli.",
            bad: "Te dwa ślady nie tworzą pary."
          },
          {
            type: "one",
            title: "Ilu bogów?",
            lead: "W Egipcie czczono wielu bogów. Jak nazywa się taka religia?",
            choices: [
              { id: "poli", label: "politeizm" },
              { id: "mono", label: "monoteizm" }
            ],
            correct: "poli",
            ok: "Archiwum odróżnia wielu bogów od wiary w jednego.",
            bad: "To nazwa drugiej religii. Wróć do liczby bogów."
          },
          {
            type: "glyphs",
            title: "Klucz do znaków",
            lead: "Na stemplu są trzy znaki. Klucz leży obok. Przypisz znaczenie.",
            glyphs: [
              { id: "sun", name: "słońce" },
              { id: "water", name: "woda" },
              { id: "bird", name: "ptak" }
            ],
            ok: "Znaki mają znaczenie. Stempel da się czytać.",
            bad: "Ten znak ma inne znaczenie w kluczu."
          },
          {
            type: "one",
            title: "Czyj jest stempel?",
            lead: "Stempel jest zapisany hieroglifami. Do jakiej cywilizacji należy?",
            choices: [
              { id: "eg", label: "Egipt" },
              { id: "me", label: "Mezopotamia" },
              { id: "iz", label: "Izrael" },
              { id: "in", label: "Indie" }
            ],
            correct: "eg",
            ok: "Stempel ma właściciela.",
            bad: "Hieroglify należą do innej cywilizacji niż ten wybór. Wróć do par z archiwum."
          }
        ]
      }
    },
    cards: {
      podroznik: "podróżnik",
      klucz: "9022",
      londyn: "Londyn",
      egipt: "starożytny Egipt"
    },
    fragments: {
      matematyka: { k: "Klucz zamka", v: "9022" },
      polski: { k: "Kto zostawił wiadomość", v: "podróżnik" },
      angielski: { k: "Skąd sygnał", v: "Londyn: autobus, rower, rejs po Tamizie" },
      historia: { k: "Dokąd stempel", v: "starożytny Egipt" }
    },
    message: "Podróżnik otworzył kapsułę kluczem 9022. Sygnał przyszedł z Londynu: autobus, rower i rejs po Tamizie. Stempel z hieroglifami prowadzi do starożytnego Egiptu."
  },
  ru: {
    brand: "МИССИЯ",
    docTitle: "Зашифрованная капсула",
    back: "← Задания",
    kicker: "Тайна путешествия во времени",
    title: "Зашифрованная капсула",
    intro: [
      "Ты нашёл зашифрованную капсулу.",
      "Внутри повреждённое сообщение о неизвестном путешествии.",
      "Нужно понять, кто его отправил, каким ключом закрыл замок, откуда пришёл сигнал и куда ведёт печать."
    ],
    progress: "Фрагменты",
    left: "Осталось испытаний",
    mapLabel: "Карта миссии",
    locked: "Сначала собери предыдущий фрагмент.",
    reward: "После этого испытания вернётся один фрагмент сообщения.",
    got: "Фрагмент сообщения",
    step: "Шаг",
    check: "Проверить",
    openTask: "Открыть задание",
    keyBtn: "Ввести ключ",
    keyPh: "результат",
    again: "Сначала",
    finaleKicker: "Собери сообщение",
    finaleTitle: "У тебя четыре фрагмента.",
    finaleLead: "Сложи их в одно сообщение. Замок откроется, когда каждый встанет на своё место.",
    placeBad: "Этот фрагмент сюда не подходит.",
    openTitle: "Капсула открыта",
    joined: "Сегодня ты соединил математику, польский, английский и историю, чтобы решить одну загадку.",
    skills: ["Мышление", "Наблюдательность", "Знания", "Решение задачи"],
    bonus: "Хочешь увидеть настоящий камень, с которого прочитали иероглифы?",
    scenes: {
      matematyka: "Компьютер капсулы остановился. Кто-то ошибся в записи.",
      polski: "В капсуле лежит порванный документ. Часть слов нужно узнать и вернуть.",
      angielski: "Капсула ловит обрывок записи. Слышны транспорт, город и река.",
      historia: "На печати символы древних цивилизаций. Архив поможет их узнать.",
      final: "Четыре фрагмента ждут. Сложи из них сообщение."
    },
    slots: [
      { id: "who", label: "Кто её оставил?" },
      { id: "key", label: "Какой ключ открывает замок?" },
      { id: "from", label: "Откуда пришёл сигнал?" },
      { id: "to", label: "Куда ведёт печать?" }
    ],
    blanks: [
      "_____ открыл капсулу ключом _____.",
      "Сигнал пришёл из _____.",
      "Печать ведёт в _____."
    ],
    stages: {
      matematyka: {
        icon: "🖥",
        subject: "Математика",
        name: "Замок компьютера",
        story: "Компьютер показывает подозрительное умножение. Сначала найди ошибку в записи. Потом замок попросит верный результат этого умножения. Результат и есть ключ: неверное число замок не откроет.",
        task: [
          "Открой задание и найди место ошибки.",
          "Решение запиши на листке.",
          "Когда вернёшься, впиши верный результат умножения 347 × 26."
        ],
        wait: "Замок пока не слушает. Сначала закончи задание на компьютере.",
        keyLead: "Задание сделано. Замок просит верный результат умножения, которое ты чинил: 347 × 26.",
        keyBad: "Замок молчит. Ещё раз проверь на листке это произведение. Впиши результат, не место ошибки."
      },
      polski: {
        icon: "📜",
        subject: "Польский язык",
        name: "Порванный документ",
        story: "Документ из капсулы порван. Чтобы вернулся смысл, узнай существительные, их род и форму и верную запись с «nie».",
        steps: [
          {
            type: "multi",
            title: "Найди существительные",
            lead: "В предложении часть слов — существительные, а часть нет. Отметь только существительные.",
            sentence: "Stary podróżnik zostawił tajną kapsułę w mieście.",
            choices: [
              { id: "stary", label: "stary" },
              { id: "podroznik", label: "podróżnik" },
              { id: "zostawil", label: "zostawił" },
              { id: "tajna", label: "tajną" },
              { id: "kapsula", label: "kapsułę" },
              { id: "miasto", label: "mieście" }
            ],
            correct: ["podroznik", "kapsula", "miasto"],
            ok: "Названия человека, вещи и места возвращаются на документ.",
            bad: "Ещё не всё. Существительное называет человека, вещь или место. Глагол и прилагательное оставь."
          },
          {
            type: "bins",
            title: "Какой это род?",
            lead: "Отнеси каждое существительное к роду.",
            bins: [
              { id: "m", label: "rodzaj męski" },
              { id: "z", label: "rodzaj żeński" },
              { id: "n", label: "rodzaj nijaki" }
            ],
            items: [
              { id: "podroznik", label: "podróżnik", bin: "m" },
              { id: "kapsula", label: "kapsuła", bin: "z" },
              { id: "miasto", label: "miasto", bin: "n" }
            ],
            ok: "Роды стоят рядом со словами.",
            bad: "Какой-то род не совпал. Проверь ещё раз."
          },
          {
            type: "one",
            title: "Какая форма подходит?",
            lead: "Допиши предложение. Кто оставил сообщение?",
            sentence: "Wiadomość zostawił _____.",
            choices: [
              { id: "mian", label: "podróżnik" },
              { id: "dop", label: "podróżnika" },
              { id: "narz", label: "podróżnikiem" }
            ],
            correct: "mian",
            ok: "В предложении есть подлежащее. Документ читается дальше.",
            bad: "Эта форма не отвечает на вопрос «кто?». Ищи именительный падеж."
          },
          {
            type: "groups",
            title: "Как пишется «nie»?",
            lead: "На документе расплылась запись. Выбери верное написание.",
            groups: [
              {
                id: "kaps",
                prompt: "Частица «nie» перед существительным kapsuła:",
                correct: "osobno",
                choices: [
                  { id: "osobno", label: "nie kapsuła" },
                  { id: "razem", label: "niekapsuła" },
                  { id: "lacznik", label: "nie-kapsuła" }
                ]
              },
              {
                id: "wrog",
                prompt: "Слово со значением «враг»:",
                correct: "jeden",
                choices: [
                  { id: "jeden", label: "nieprzyjaciel" },
                  { id: "dwa", label: "nie przyjaciel" },
                  { id: "lacznik", label: "nie-przyjaciel" }
                ]
              }
            ],
            ok: "Запись чистая. Документ снова можно читать.",
            bad: "Одна запись всё ещё расплывается. Проверь обе строки."
          }
        ]
      },
      angielski: {
        icon: "📻",
        subject: "Английский язык",
        name: "Сигнал из города",
        story: "Запись на английском. Узнай транспорт, восстанови маршрут и знак у реки.",
        steps: [
          {
            type: "signal",
            title: "Что ты слышишь?",
            lead: "Радио называет одно слово. Покажи транспорт.",
            rounds: [
              { say: "bus", correct: "bus", choices: ["bus", "plane", "ship", "taxi"] },
              { say: "bike", correct: "bike", choices: ["bike", "tram", "car", "train"] },
              { say: "cable car", correct: "cable", choices: ["cable", "motorbike", "plane", "bus"] },
              { say: "helicopter", correct: "heli", choices: ["heli", "boat", "taxi", "tram"] },
              { say: "boat", correct: "boat", choices: ["boat", "car", "train", "bike"] },
              { say: "tram", correct: "tram", choices: ["tram", "ship", "motorbike", "heli"] }
            ],
            icons: {
              bus: "🚌", train: "🚆", taxi: "🚕", bike: "🚲", motorbike: "🏍️",
              cable: "🚠", plane: "✈️", heli: "🚁", car: "🚗", boat: "⛵", ship: "🚢", tram: "🚊"
            },
            names: {
              bus: "bus", train: "train", taxi: "taxi", bike: "bike", motorbike: "motorbike",
              cable: "cable car", plane: "plane", heli: "helicopter", car: "car", boat: "boat", ship: "ship", tram: "tram"
            },
            ok: "Названия транспорта звучат ясно.",
            bad: "Это другой транспорт. Послушай слово ещё раз."
          },
          {
            type: "flags",
            title: "Сообщение Салли",
            lead: "Прочитай запись и оцени фразы.",
            text: "Hi! I'm Sally. I get around London on a red double-decker bus. Then I do a bike tour and check out the sights.",
            items: [
              { id: "a", text: "Сначала Салли едет на красном двухэтажном автобусе.", ok: true },
              { id: "b", text: "Сначала она летит на вертолёте.", ok: false },
              { id: "c", text: "Она смотрит достопримечательности.", ok: true }
            ],
            yes: "Верно",
            no: "Неверно",
            ok: "Первая часть маршрута вернулась.",
            bad: "Какая-то фраза не совпадает с записью. Вернись к тексту."
          },
          {
            type: "one",
            title: "Что мягче для города?",
            lead: "Дальше в записи:",
            text: "Later I take the cable car. I skip the helicopter tour. A cruise along the River Thames is more environmentally friendly.",
            sentence: "Что Салли выбирает как more environmentally friendly?",
            choices: [
              { id: "heli", label: "helicopter tour" },
              { id: "cruise", label: "cruise along the River Thames" }
            ],
            correct: "cruise",
            ok: "Сигнал отбрасывает громкий полёт. Остаётся река.",
            bad: "В записи иначе. Проверь, от какой поездки Салли отказывается."
          },
          {
            type: "one",
            title: "Знак у реки",
            lead: "На записи виден знак. Что он говорит путешественнику?",
            sign: "THAMES CRUISE",
            choices: [
              { id: "fly", label: "лететь на вертолёте" },
              { id: "river", label: "отправиться в речной круиз" },
              { id: "train", label: "сесть в подземный поезд" }
            ],
            correct: "river",
            ok: "Знак прочитан. У маршрута есть конец.",
            bad: "Этот знак не про такой транспорт. Прочитай надпись ещё раз."
          }
        ]
      },
      historia: {
        icon: "🏛",
        subject: "История",
        name: "Архив цивилизаций",
        story: "Печать ты сравнишь с архивом темы о древних цивилизациях. Несколько следов, не длинная контрольная.",
        steps: [
          {
            type: "order",
            title: "Разложи эпохи",
            lead: "С самой древней.",
            items: [
              { id: "b", label: "epoka brązu" },
              { id: "z", label: "epoka żelaza" },
              { id: "k", label: "epoka kamienia" }
            ],
            correct: ["k", "b", "z"],
            ok: "Линия времени стоит прямо.",
            bad: "Порядок ещё прыгает. Подумай, какая эпоха была самой древней."
          },
          {
            type: "one",
            title: "Большая перемена",
            lead: "Люди начали обрабатывать землю и жить на одном месте. Как называется эта перемена?",
            choices: [
              { id: "neo", label: "rewolucja neolityczna" },
              { id: "zel", label: "wynalezienie żelaza" },
              { id: "ham", label: "kodeks Hammurabiego" }
            ],
            correct: "neo",
            ok: "Архив узнаёт начало поселений.",
            bad: "Это другое событие. Ищи перемену, связанную с обработкой земли."
          },
          {
            type: "match",
            title: "Соедини след с цивилизацией",
            lead: "Нажми след, потом цивилизацию.",
            pairs: [
              { id: "h", left: "hieroglify", right: "Egipt" },
              { id: "k", left: "pismo klinowe", right: "Mezopotamia" },
              { id: "ham", left: "kodeks Hammurabiego", right: "Mezopotamia" },
              { id: "b", left: "wiara w jednego Boga", right: "Izrael" },
              { id: "i", left: "dolina Indusu", right: "Indie" }
            ],
            ok: "У следов есть хозяева.",
            bad: "Эти два следа не пара."
          },
          {
            type: "one",
            title: "Сколько богов?",
            lead: "В Египте чтили многих богов. Как называется такая религия?",
            choices: [
              { id: "poli", label: "politeizm" },
              { id: "mono", label: "monoteizm" }
            ],
            correct: "poli",
            ok: "Архив отличает многих богов от веры в одного.",
            bad: "Это название другой религии. Вернись к числу богов."
          },
          {
            type: "glyphs",
            title: "Ключ к знакам",
            lead: "На печати три знака. Ключ лежит рядом. Подбери значение.",
            glyphs: [
              { id: "sun", name: "słońce" },
              { id: "water", name: "woda" },
              { id: "bird", name: "ptak" }
            ],
            ok: "У знаков есть значение. Печать можно читать.",
            bad: "У этого знака в ключе другое значение."
          },
          {
            type: "one",
            title: "Чья печать?",
            lead: "Печать записана иероглифами. Какой цивилизации она принадлежит?",
            choices: [
              { id: "eg", label: "Egipt" },
              { id: "me", label: "Mezopotamia" },
              { id: "iz", label: "Izrael" },
              { id: "in", label: "Indie" }
            ],
            correct: "eg",
            ok: "У печати есть хозяин.",
            bad: "Иероглифы принадлежат другой цивилизации. Вернись к парам из архива."
          }
        ]
      }
    },
    cards: {
      podroznik: "podróżnik",
      klucz: "9022",
      londyn: "Londyn",
      egipt: "starożytny Egipt"
    },
    fragments: {
      matematyka: { k: "Ключ замка", v: "9022" },
      polski: { k: "Кто оставил сообщение", v: "podróżnik" },
      angielski: { k: "Откуда сигнал", v: "Лондон: автобус, велосипед, круиз по Темзе" },
      historia: { k: "Куда печать", v: "Древний Египет" }
    },
    message: "Путешественник открыл капсулу ключом 9022. Сигнал пришёл из Лондона: автобус, велосипед и круиз по Темзе. Печать с иероглифами ведёт в Древний Египет."
  }
};
