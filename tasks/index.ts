import {join} from "path";
const [, , task] = process.argv;
import(join(__dirname, task));
