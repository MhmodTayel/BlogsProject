async function getData() {
  const data = await fetch("http://localhost:3000/");
  const res = await data.json();
  console.log(res);
}

getData();
