interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

const Students: Student[] = [
  { imie: "Mariusz", nazwisko: "Izbi", rocznik: 1969 },
  { imie: "Janusz", nazwisko: "Nowak", rocznik: 1967 },
  { imie: "John", nazwisko: "Scratch", rocznik: 2001 },
];

const Studenci = () => {
  return (
    <div>
      <h2>Studenci</h2>

      <table border={1}>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>

        <tbody>
          {Students.map((student, index) => (
            <tr key={index}>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Studenci;
