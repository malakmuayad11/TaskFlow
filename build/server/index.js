import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx, jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region app/context/UserContext.tsx
var UserContext = createContext(null);
//#endregion
//#region app/services/cookiesService.ts
function getCookie(cookieName) {
	const cookies = document.cookie.split(";");
	for (let c of cookies) {
		c = c.trim();
		if (c.startsWith(cookieName + "=")) return c.substring(cookieName.length + 1);
	}
	return null;
}
//#endregion
//#region app/services/indexedDB/indexedDbService.ts
var db = null;
function openDatabase() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open("TaskFlow", 4);
		request.onupgradeneeded = () => {
			const database = request.result;
			if (!database.objectStoreNames.contains("users")) database.createObjectStore("users", {
				keyPath: "userId",
				autoIncrement: true
			}).createIndex("emailIndex", "email", { unique: true });
			if (!database.objectStoreNames.contains("tasks")) database.createObjectStore("tasks", {
				keyPath: "taskId",
				autoIncrement: true
			}).createIndex("userIdIndex", "userId", { unique: false });
		};
		request.onsuccess = () => {
			db = request.result;
			resolve(request.result);
		};
		request.onerror = () => {
			reject(request.error);
		};
	});
}
async function getDB() {
	await openDatabase();
	if (!db) throw new Error("Database is not initialized");
	return db;
}
//#endregion
//#region app/services/indexedDB/userService.ts
async function getUserById(userId) {
	const db = await getDB();
	return new Promise((resolve, reject) => {
		if (!db) {
			reject(/* @__PURE__ */ new Error("Database is not initialized."));
			return;
		}
		const getRequest = db.transaction("users", "readonly").objectStore("users").get(userId);
		getRequest.onsuccess = () => {
			const result = getRequest.result;
			if (result) resolve(result);
			else reject(/* @__PURE__ */ new Error("User not found."));
		};
		getRequest.onerror = () => {
			reject(getRequest.error ?? /* @__PURE__ */ new Error("Error getting the user."));
		};
	});
}
//#endregion
//#region app/context/UserProvider.tsx
var UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const cookieUserId = getCookie("userId");
		if (!cookieUserId) return;
		const id = parseInt(cookieUserId);
		if (Number.isNaN(id)) return;
		async function setUserProvider() {
			try {
				const user = await getUserById(id);
				setUser(user);
			} catch {
				console.error("Error while fetching user from IndexedDB");
			}
		}
		setUserProvider();
	}, []);
	return /* @__PURE__ */ jsx(UserContext.Provider, {
		value: {
			user,
			setUser
		},
		children
	});
};
//#endregion
//#region app/context/TasksContext.tsx
var TasksContext = createContext({
	tasks: [],
	setTasks: () => void 0
});
//#endregion
//#region app/services/indexedDB/taskService.ts
async function getTasksByUserId(userId) {
	const db = await getDB();
	return new Promise((resolve, reject) => {
		if (!db) {
			reject(/* @__PURE__ */ new Error("Database is not initialized."));
			return;
		}
		const request = db.transaction("tasks", "readonly").objectStore("tasks").index("userIdIndex").getAll(userId);
		request.onsuccess = () => {
			resolve(request.result);
		};
		request.onerror = () => {
			reject(request.error ?? /* @__PURE__ */ new Error("Error retrieving tasks."));
		};
	});
}
//#endregion
//#region app/hooks/useLoadTasks.tsx
function useLoadTasks(userId, setTasks) {
	useEffect(() => {
		async function loadTasks() {
			if (!userId) return;
			try {
				setTasks(await getTasksByUserId(userId));
				console.log("Tasks are loaded");
			} catch (error) {
				console.error("Failed to load tasks:", error);
			}
		}
		loadTasks();
	}, [userId]);
}
//#endregion
//#region app/context/TasksProvider.tsx
function TasksProvider({ children }) {
	const [tasks, setTasks] = useState([]);
	const userId = useContext(UserContext)?.user?.userId;
	useLoadTasks(userId ?? null, setTasks);
	return /* @__PURE__ */ jsx(TasksContext.Provider, {
		value: {
			tasks,
			setTasks
		},
		children
	});
}
//#endregion
//#region app/context/ThemeContext.tsx
var ThemeContext = createContext({
	theme: "Light",
	setTheme: () => void 0
});
//#endregion
//#region app/services/localStorageService.ts
function getValue(valueName) {
	return localStorage.getItem(valueName);
}
//#endregion
//#region app/context/ThemeProvider.tsx
function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(getValue("theme") ?? "Light");
	return /* @__PURE__ */ jsx(ThemeContext.Provider, {
		value: {
			theme,
			setTheme
		},
		children
	});
}
//#endregion
//#region app/context/ViewContext.tsx
var ViewContext = createContext({
	view: "List",
	setView: () => void 0
});
//#endregion
//#region app/context/ViewProvider.tsx
var ViewProvider = ({ children }) => {
	const [view, setView] = useState(getValue("view") ?? "List");
	return /* @__PURE__ */ jsx(ViewContext.Provider, {
		value: {
			view,
			setView
		},
		children
	});
};
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	links: () => links
});
var links = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
	},
	{
		rel: "icon",
		href: "public/favicon.ico"
	},
	{
		rel: "icon",
		type: "image/png",
		sizes: "32x32",
		href: "public/favicon-32x32.png"
	},
	{
		rel: "icon",
		type: "image/png",
		sizes: "16x16",
		href: "public/favicon-16x16.png"
	},
	{
		rel: "apple-touch-icon",
		sizes: "180x180",
		href: "public/apple-touch-icon.png"
	}
];
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(UserProvider, { children: /* @__PURE__ */ jsx(TasksProvider, { children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(ViewProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) }) }) });
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "pt-16 p-4 container mx-auto",
		children: [
			/* @__PURE__ */ jsx("h1", { children: message }),
			/* @__PURE__ */ jsx("p", { children: details }),
			stack
		]
	});
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-DO_goMg8.js",
		"imports": [
			"/assets/utils-BkEaPY0J.js",
			"/assets/jsx-runtime-DIf4hgSt.js",
			"/assets/errorBoundaries-B4TSLXRN.js",
			"/assets/preload-helper-Czpn1I53.js"
		],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-CNRq5shR.js",
			"imports": [
				"/assets/utils-BkEaPY0J.js",
				"/assets/jsx-runtime-DIf4hgSt.js",
				"/assets/errorBoundaries-B4TSLXRN.js",
				"/assets/preload-helper-Czpn1I53.js",
				"/assets/lib-C9LYqobm.js",
				"/assets/UserContext-h4AJ9ckW.js",
				"/assets/cookiesService-CcP_a7kE.js",
				"/assets/userService-BoPo5aCT.js",
				"/assets/TasksContext-R2JFZJrI.js",
				"/assets/useLoadTasks-nO02ELLz.js",
				"/assets/ThemeContext-BGcjjvPb.js",
				"/assets/localStorageService-CMPEGI0o.js",
				"/assets/ViewContext-C3Cb_Qtk.js",
				"/assets/indexedDbService-DPLE7Rek.js",
				"/assets/taskService-BOzIF-fi.js"
			],
			"css": ["/assets/root-j3pf2nsd.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": true,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-main-BQBD8v1U.js",
			"imports": [
				"/assets/utils-BkEaPY0J.js",
				"/assets/jsx-runtime-DIf4hgSt.js",
				"/assets/lib-C9LYqobm.js",
				"/assets/ThemeContext-BGcjjvPb.js",
				"/assets/Button-BXvCVTqe.js",
				"/assets/logo-DIcN4EhQ.js",
				"/assets/errorBoundaries-B4TSLXRN.js",
				"/assets/preload-helper-Czpn1I53.js",
				"/assets/cookiesService-CcP_a7kE.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": "/assets/home-client-loader-BCxZW_-Y.js",
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/sign-up": {
			"id": "routes/sign-up",
			"parentId": "root",
			"path": "sign-up",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/sign-up-og7AVcYp.js",
			"imports": [
				"/assets/utils-BkEaPY0J.js",
				"/assets/jsx-runtime-DIf4hgSt.js",
				"/assets/userService-BoPo5aCT.js",
				"/assets/ThemeContext-BGcjjvPb.js",
				"/assets/Button-BXvCVTqe.js",
				"/assets/Input-BXMCaNlg.js",
				"/assets/base64-DyLRgyN_.js",
				"/assets/validation-Dv7jru-w.js",
				"/assets/Toast-BiaZv2Hc.js",
				"/assets/indexedDbService-DPLE7Rek.js",
				"/assets/UserContext-h4AJ9ckW.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/login": {
			"id": "routes/login",
			"parentId": "root",
			"path": "login",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/login-BvYy2_e6.js",
			"imports": [
				"/assets/utils-BkEaPY0J.js",
				"/assets/jsx-runtime-DIf4hgSt.js",
				"/assets/UserContext-h4AJ9ckW.js",
				"/assets/cookiesService-CcP_a7kE.js",
				"/assets/userService-BoPo5aCT.js",
				"/assets/ThemeContext-BGcjjvPb.js",
				"/assets/Button-BXvCVTqe.js",
				"/assets/Input-BXMCaNlg.js",
				"/assets/validation-Dv7jru-w.js",
				"/assets/indexedDbService-DPLE7Rek.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/dashboard": {
			"id": "routes/dashboard",
			"parentId": "root",
			"path": "dashboard",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/dashboard-CbUntGLp.js",
			"imports": [
				"/assets/utils-BkEaPY0J.js",
				"/assets/jsx-runtime-DIf4hgSt.js",
				"/assets/lib-C9LYqobm.js",
				"/assets/UserContext-h4AJ9ckW.js",
				"/assets/cookiesService-CcP_a7kE.js",
				"/assets/ThemeContext-BGcjjvPb.js",
				"/assets/localStorageService-CMPEGI0o.js",
				"/assets/logo-DIcN4EhQ.js",
				"/assets/errorBoundaries-B4TSLXRN.js",
				"/assets/preload-helper-Czpn1I53.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/dashboard-home": {
			"id": "routes/dashboard-home",
			"parentId": "routes/dashboard",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/dashboard-home-DIPYMakC.js",
			"imports": [
				"/assets/utils-BkEaPY0J.js",
				"/assets/jsx-runtime-DIf4hgSt.js",
				"/assets/UserContext-h4AJ9ckW.js",
				"/assets/TasksContext-R2JFZJrI.js",
				"/assets/useLoadTasks-nO02ELLz.js",
				"/assets/ThemeContext-BGcjjvPb.js",
				"/assets/paginationService-CbvAfoh3.js",
				"/assets/taskService-BOzIF-fi.js",
				"/assets/indexedDbService-DPLE7Rek.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/tasks": {
			"id": "routes/tasks",
			"parentId": "routes/dashboard",
			"path": "tasks",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/tasks-BatDpcs_.js",
			"imports": [
				"/assets/utils-BkEaPY0J.js",
				"/assets/jsx-runtime-DIf4hgSt.js",
				"/assets/UserContext-h4AJ9ckW.js",
				"/assets/TasksContext-R2JFZJrI.js",
				"/assets/taskService-BOzIF-fi.js",
				"/assets/ThemeContext-BGcjjvPb.js",
				"/assets/ViewContext-C3Cb_Qtk.js",
				"/assets/Button-BXvCVTqe.js",
				"/assets/Input-BXMCaNlg.js",
				"/assets/Toast-BiaZv2Hc.js",
				"/assets/paginationService-CbvAfoh3.js",
				"/assets/ConfirmationDialog-CzEMBxIP.js",
				"/assets/indexedDbService-DPLE7Rek.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/settings": {
			"id": "routes/settings",
			"parentId": "routes/dashboard",
			"path": "settings",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/settings-C6NC1xHv.js",
			"imports": [
				"/assets/utils-BkEaPY0J.js",
				"/assets/jsx-runtime-DIf4hgSt.js",
				"/assets/preload-helper-Czpn1I53.js",
				"/assets/UserContext-h4AJ9ckW.js",
				"/assets/userService-BoPo5aCT.js",
				"/assets/taskService-BOzIF-fi.js",
				"/assets/ThemeContext-BGcjjvPb.js",
				"/assets/localStorageService-CMPEGI0o.js",
				"/assets/ViewContext-C3Cb_Qtk.js",
				"/assets/Button-BXvCVTqe.js",
				"/assets/Input-BXMCaNlg.js",
				"/assets/base64-DyLRgyN_.js",
				"/assets/validation-Dv7jru-w.js",
				"/assets/Toast-BiaZv2Hc.js",
				"/assets/ConfirmationDialog-CzEMBxIP.js",
				"/assets/typeof-B5XbjTb1.js",
				"/assets/indexedDbService-DPLE7Rek.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-9fa3932c.js",
	"version": "9fa3932c",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var route1 = { default: () => null };
var route2 = { default: () => null };
var route3 = { default: () => null };
var route4 = { default: () => null };
var route5 = { default: () => null };
var route6 = { default: () => null };
var route7 = { default: () => null };
var assetsBuildDirectory = "build\\client";
var basename = "/";
var future = {
	"unstable_enableNodeReadableStream": false,
	"unstable_optimizeDeps": false
};
var ssr = false;
var isSpaMode = true;
var prerender = [];
var routeDiscovery = { "mode": "initial" };
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: route1
	},
	"routes/sign-up": {
		id: "routes/sign-up",
		parentId: "root",
		path: "sign-up",
		index: void 0,
		caseSensitive: void 0,
		module: route2
	},
	"routes/login": {
		id: "routes/login",
		parentId: "root",
		path: "login",
		index: void 0,
		caseSensitive: void 0,
		module: route3
	},
	"routes/dashboard": {
		id: "routes/dashboard",
		parentId: "root",
		path: "dashboard",
		index: void 0,
		caseSensitive: void 0,
		module: route4
	},
	"routes/dashboard-home": {
		id: "routes/dashboard-home",
		parentId: "routes/dashboard",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: route5
	},
	"routes/tasks": {
		id: "routes/tasks",
		parentId: "routes/dashboard",
		path: "tasks",
		index: void 0,
		caseSensitive: void 0,
		module: route6
	},
	"routes/settings": {
		id: "routes/settings",
		parentId: "routes/dashboard",
		path: "settings",
		index: void 0,
		caseSensitive: void 0,
		module: route7
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
