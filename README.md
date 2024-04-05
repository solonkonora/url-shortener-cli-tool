# URL Shortener CLI Tool

The URL Shortener CLI Tool is a command-line interface (CLI) application that allows you to shorten URLs using the CleanURI API and store them in a PostgreSQL database. It provides commands to generate shortened URLs and list all previously shortened URLs, together with the help command to better inform its users.

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the required dependencies.

## Configuration

Before using the URL Shortener CLI Tool, you need to configure the PostgreSQL database connection. Follow these steps:

1. Open the `cli.js` file in a text editor.
2. Locate the following lines of code:

   ```javascript
   const sequelize = new Sequelize('clitool', 'nkwada', 'norash', {
     host: 'localhost',
     dialect: 'postgres',
   });
   ```

3. Modify the parameters to match your PostgreSQL database configuration. Replace `'clitool'` with your database name, `'nkwada'` with your database username, and `'norash'` with your database password.

## Usage

To use the URL Shortener CLI Tool, run the `cli.js` script followed by the desired command.

### Command: shorten

Use the `shorten` command to shorten a URL.

```shell
node cli.js shorten <url>
```

Replace `<url>` with the long URL that you want to shorten.

Example:

```shell
node cli.js shorten https://www.example.com
```

### Command: list

Use the `list` command to list all previously shortened URLs.

```shell
node cli.js list
```

Example:

```shell
node cli.js list
```

## License

This project is licensed under the [MIT License](LICENSE).
