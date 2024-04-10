# URL Shortener CLI Tool

The URL Shortener CLI Tool is a command-line interface (CLI) application that allows you to shorten URLs using the CleanURI API and store them in a PostgreSQL database. It provides commands to generate shortened URLs and list all previously shortened URLs, together with the help command to better inform its users.

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the required dependencies.


## Configuration

Before using the URL Shortener CLI Tool, you need to configure the PostgreSQL database connection. Follow these steps:

1) connect the application to your postgres database.
2) The table urls in the database contains three columns the id, long_url and short_url      columns


## Usage

To use the URL Shortener CLI Tool, 
1) clone the project and do neccesary configuration
2) navigate to root direction of the project
3) install the project as a global package with command "npm install -g url-shorterner-cli-tool"

Note: The external URL shortening service used is "cleanuri" and it does not require any key for its usage.
API_KEY=https://cleanuri.com/api/v1/shorten

### Command: shorten

Use the `shorten` command to shorten a URL.

```shell
url-shorterner-cli-tool shorten <url>
```

Replace `<url>` with the long URL that you want to shorten.

Example:

```shell
url-shorterner-cli-tool shorten https://www.example.com
```

### Command: list

Use the `list` command to list all previously shortened URLs.

```shell
url-shorterner-cli-tool list
```
### Command: help

Use the `help` command to list all previously shortened URLs.

```shell
url-shorterner-cli-tool help
```
## License

This project is licensed under the [MIT License](LICENSE).
