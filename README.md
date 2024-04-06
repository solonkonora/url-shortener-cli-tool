# URL Shortener CLI Tool

The URL Shortener CLI Tool is a command-line interface (CLI) application that allows you to shorten URLs using the CleanURI API and store them in a PostgreSQL database. It provides commands to generate shortened URLs and list all previously shortened URLs, together with the help command to better inform its users.

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the required dependencies.

## Configuration

Before using the URL Shortener CLI Tool, you need to configure the PostgreSQL database connection. Follow these steps:

1. Open the `db_sequelize.js` file in a text editor.
2. Locate the following lines of code:

   ```javascript

   const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,

  });
   ```

3. Modify the parameters to match your PostgreSQL database configuration. Replace `'process.env.DB_DATABASE'` with your database name, `'process.env.DB_USER'` with your database username, and `'process.env.DB_PASSWORD'` with your database password.

## Usage

To use the URL Shortener CLI Tool, run the `bin/index.js` script followed by the desired command.

### Command: shorten

Use the `shorten` command to shorten a URL.

```shell
node bin/index.js shorten <url>
```

Replace `<url>` with the long URL that you want to shorten.

Example:

```shell
node bin/index.js shorten https://www.example.com
```

### Command: list

Use the `list` command to list all previously shortened URLs.

```shell
node bin/index.js list
```

Example:

```shell
node bin/index.js list
```

## License

This project is licensed under the [MIT License](LICENSE).
