document.addEventListener("click", ({ target }) => {
  const id = target.dataset.id;
  if (target.dataset.type === "remove") {
    remove(id).then(() => {
      target.closest("li").remove();
    });
  } else if (target.dataset.type === "edit") {
    const title = prompt("Введите новое название");
    if (title === null) return;

    edit(id, title).then(() => {
      target.closest("li").firstElementChild.innerText = title;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, title) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  };
  await fetch(`/${id}`, requestOptions);
}
