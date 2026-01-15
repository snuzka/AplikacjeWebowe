import { useState } from "react";
import Dodawanie from "./Dodawanie";

interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

const startowiStudenci: Student[] = [
  { imie: "Mariusz", nazwisko: "Izbi", rocznik: 1969 },
  { imie: "Janusz", nazwisko: "Nowak", rocznik: 1967 },
  { imie: "John", nazwisko: "Scratch", rocznik: 2001 },
];

const StudentManager = () => {
  const [studenci, setStudenci] = useState<Student[]>(startowiStudenci);

  const dodajStudenta = (student: Student) => {
    setStudenci((prev) => [...prev, student]);
  };

  return (
    <div>
      <h2>Student Manager</h2>

      <table border={1}>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>

        <tbody>
          {studenci.map((s, index) => (
            <tr key={index}>
              <td>{s.imie}</td>
              <td>{s.nazwisko}</td>
              <td>{s.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dodawanie onDodaj={dodajStudenta} />
    </div>
  );
};

export default StudentManager;
