import {
  parse
} from "./chunk-WYBRMNLJ.js";
import "./chunk-5KFTRDEJ.js";
import "./chunk-3WUFVVE4.js";
import "./chunk-NZSYFZEZ.js";
import "./chunk-QGCFLVYL.js";
import "./chunk-6IFZFQE4.js";
import "./chunk-BAJ4MITQ.js";
import "./chunk-6MQUHXBV.js";
import "./chunk-LNJL4LJM.js";
import {
  selectSvgElement
} from "./chunk-F4H5GM66.js";
import "./chunk-JBQCOODC.js";
import {
  configureSvgSize
} from "./chunk-I2H44ZB6.js";
import "./chunk-NBWFZMTS.js";
import "./chunk-ST3SR5TB.js";
import {
  __name,
  log
} from "./chunk-WT6GZSWG.js";
import "./chunk-FOQIPI7F.js";

// node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-LFFYTUFH.mjs
var parser = {
  parse: __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};
var DEFAULT_INFO_DB = {
  version: "11.13.0" + (true ? "" : "-tiny")
};
var getVersion = __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
//# sourceMappingURL=infoDiagram-LFFYTUFH-JC7HN4OU.js.map
