import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import {I18nextProvider} from 'react-i18next';
import i18n from './service/i18n.jsx';
import { ThemeProvider } from "./components/ThemeContext";

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<I18nextProvider i18n={i18n}>
				<ThemeProvider>
				<App/>
				</ThemeProvider>
			</I18nextProvider>
		</BrowserRouter>
	</React.StrictMode>,
)
