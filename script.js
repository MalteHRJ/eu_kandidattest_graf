const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const particles = new Map();
const springs = [];
const partyColors = {
  A: "#f00b2f",
  V: "#0781DD",
  C: "#06691e",
  B: "#Fc00af",
  Ø: "#FF7400",
  F: "#Ff7799",
  Å: "#3ce63d",
  I: "#48CEF3",
  Æ: "#003d7f",
  M: "#842990",
  O: "#F6BA00",
};
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;

async function getData() {
  const res = await fetch("./assets/candidateGraph.json");
  const data = await res.json();
  return data.adjacencyList;
}

function animate() {
  //¤ resets canvas
  context.fillStyle = "#0a0906";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  springs.forEach((spring) => {
    const displacement = spring.update();
    if (displacement < 200) {
      spring.draw(context);
    }
  });
  particles.forEach((particle) => {
    particle.update();

    particle.draw(context);
  });
}

function particleConstructor(node, index) {
  const nodeColor = partyColors[node.partyCode];
  const particle = new Particle(
    node.initials,
    nodeColor,
    node.adjacencyList,
    node.id
  );
  //¤ creates a 13*13 grid and set the position according to index
  const xPos = (canvas.width / 13) * (index % 13) + canvas.width / 26;
  const yPos =
    (canvas.height / 13) * Math.floor(index / 13) + canvas.width / 26;
  particle.position = { x: xPos, y: yPos };
  particles.set(particle.id, particle);
}
function springConsstructor(weight, originNode, targetNode) {
  const spring = new Spring(weight, originNode, targetNode);
  originNode.springList.add(targetNode.id);
  targetNode.springList.add(originNode.id);
  spring.update();
  spring.draw(context);
  springs.push(spring);
}
function clickEvent(e) {
  const mousePos = { x: e.offsetX, y: e.offsetY };
  let targetClicked = false;
  particles.forEach((particle) => {
    const dx = particle.position.x - mousePos.x;
    const dy = particle.position.y - mousePos.y;
    if (particle.isCurrent) {
      particle.isCurrent = false;
    }
    if (
      dx < particle.radius &&
      dx > -particle.radius &&
      dy < particle.radius &&
      dy > -particle.radius
    ) {
      particle.isCurrent = true;
      targetClicked = true;
      addInfo(particle.id);
    }
  });
  if (!targetClicked) {
    addInfo(null);
  }
}
async function addInfo(id) {
  const info = document.getElementById("Info");
  if (id == null) {
    info.dataset.show = "false";
    info.dataset.candidate = "";
  } else {
    info.dataset.show = "true";
    info.dataset.candidate = id;
    const res = await fetch("./assets/candidatesWithAnswers.json");
    const data = await res.json();
    const candidate = await data.find(
      (candidate) => candidate.candidateId == id
    );
    info.querySelector("#candidateImg").src = candidate.picture;
    info.querySelector("#candidateName").innerHTML = candidate.name;
    info.querySelector("#candidateParty").innerHTML = candidate.partyName;
  }
}
async function main() {
  const data = Object.values(await getData());
  data.forEach((node, index) => {
    particleConstructor(node, index);
  });
  particles.forEach((particle) => {
    Object.entries(particle.adjacencyList).forEach((target) => {
      if (particle.springList.has(target[0])) {
        return;
      }
      const targetParticle = particles.get(target[0]);
      const weight = target[1];
      if (!targetParticle) {
        return;
      }
      springConsstructor(weight, particle, targetParticle);
    });
  });
  canvas.addEventListener("mousedown", (e) => {
    clickEvent(e);
  });
  canvas.addEventListener("mouseup", () => {
    currentParticle = null;
  });
}

main();
setInterval(animate, 30);
