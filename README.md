# Weighted graph connection danish EP candidates by answers in common

[Demo Page](https://maltehrj.github.io/eu_kandidattest_graf/)  

data is gathered from [Altingets Kandidattest EU-valg 2024](https://www.altinget.dk/kandidattest/EU24)  

Each node represents a dansih EU-Parlement candidate. Connections between candidates are weighted by how many identical answers the given two candidates had in common on [Altingets Kandidattest EU-valg 2024](https://www.altinget.dk/kandidattest/EU24).  

the attraction between nodes is based on [Hooke's Law](https://en.wikipedia.org/wiki/Hooke%27s_law):  
````
 F = -k * x 
````
with the spring constant: *k*, being based on the weight between nodes. Based on this, candidates with a more answers in common will have a higher attraction between eachother.

In simple terms, we can imagine each candidate is being represented by a ball, connected by springs to each other ball. The strength of the spring being based on how much the two candidates agree with each other politically.

Connections are only shown when nodes are within a certain distance from eachother. this is mostly to improve performance and to make the graph look less busy.

Nodes are colored by the party of the given candidate and connections between two condidates from the same party is given the party's color. This helps to show how much candidates from the same party agrees with eachother, aswell as making party groupings and outliers more clear. 

Each node can be clicked to reveal the candidate it represents

## Observations

* Candidates are naturally being grouped by parties.
* The political spectrum within danish politics naturally arises. Given that political candidates from the extremes of the spectrum, have less in common, the attraction between them are also lower.
* the parties who are grouped closer toghether (_LA, SF & Ø_) and therefore are more politically united, was also the parties that gathered the most new support. 

## possible improvements and technologies used

 written in HTML, CSS and vanilla Javascript. The graph is displayed using the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API). 

 **possible improvement**
 * add meta-ball effect (_glowy glooby effect_) to party groupings, to further highligt connections within parties.
 * add controls for the graph building parameters
 * add a filter system the only show connection based on specific categories of questions and/or specific questions
