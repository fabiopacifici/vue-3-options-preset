const { vol } = require("memfs");
jest.mock("fs/promises");

const { getJsonDataFromFile } = require("../../src/bin/getJsonDataFromFile");

// import all json config files
const { config } = require('../../src/config/config.test');
const { JSON_FILE } = config.get();

describe(getJsonDataFromFile, () => {
    beforeEach(() => {
        vol.reset();
    });

    it("Should pass if the file package.json has been found and the content is read and converted to an object", async () => {

        vol.fromJSON(
            {
                [JSON_FILE]: "{ \"check\": true }"
            },
            '/'
        );

        const jsonData = await getJsonDataFromFile(JSON_FILE);
        expect(jsonData).toEqual({ check: true });
    });

    it("Should fail if the file package.json has not been found", async () => {

        vol.fromJSON(
            {
                "/noPackage.json": "{ \"check\": true }"
            },
            '/'
        );

        await expect(() => getJsonDataFromFile(JSON_FILE)).rejects.toThrow(Error);
    });
});