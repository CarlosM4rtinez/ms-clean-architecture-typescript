import {Module} from "@nestjs/common";
import * as path from "path";
import * as glob from "glob";

@Module({
    imports: [],
    controllers: [...loadControllers(path.resolve(__dirname, "controllers"))],
    providers: [],
})
export class AppModule {}

function loadControllers(directory: string): any[] {
    const files = glob.sync(`${directory}/**/*.controller.ts`);
    return files.map((file) => {
        const module = require(file);
        return module[Object.keys(module)[0]];
    });
}
