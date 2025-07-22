import { BASE_PATH, TEMPLATES_PATH } from "../utils/index.js"
import type { NodePlopAPI } from "plop"

export default (plop: NodePlopAPI) => {
	const { setGenerator } = plop

	setGenerator("service", {
		description: "Generate a new API service",
		prompts: [
			{ type: "input", name: "name", message: "Enter service's name" },
		],
		actions: [
			"Creating your server route",
			{
				type: "add",
				path: `${BASE_PATH}/api/{{>kebabName}}.service.ts`,
				templateFile: `${TEMPLATES_PATH}/service.hbs`,
			},
			"Exporting your new service",
			{
				type: "modify",
				path: `${BASE_PATH}/api/index.ts`,
				template: `export * from "./{{>kebabName}}.service"\n$1`,
				pattern: /(\/\* Prepend export - DO NOT REMOVE \*\/)/g,
			},
			"Creating a new type for your service",
			{
				type: "add",
				path: `${BASE_PATH}/types/{{>pascalName}}.type.ts`,
				templateFile: `${TEMPLATES_PATH}/type.hbs`,
			},
			"Exporting your new type",
			{
				type: "modify",
				path: `${BASE_PATH}/types/index.ts`,
				template: `export * from "./{{>pascalName}}.type"\n$1`,
				pattern: /(\/\* Prepend export - DO NOT REMOVE \*\/)/g,
			},
			"Adding your new routes to server paths",
			{
				type: "modify",
				path: `${BASE_PATH}/api/server-paths.ts`,
				template: `{{ constantCase name }}: "/{{>kebabName}}",\n\t$1`,
				pattern: /(\/\* Prepend path root - DO NOT REMOVE \*\/)/g,
			},
			{
				type: "modify",
				path: `${BASE_PATH}/api/server-paths.ts`,
				template: `{{ constantCase name }}: {\n\t\tROOT: SERVER_PATH_ROOTS.{{ constantCase name }},\n\t\tALL_{{ constantCase name }}S: "/all-{{>kebabName}}s",\n\t\tGET_{{constantCase name}}: (id: string) => \`/{{>kebabName}}/\${id}\`,\n\t},\n\t$1`,
				pattern: /(\/\* Prepend server path - DO NOT REMOVE \*\/)/g,
			},
		],
	})
}
