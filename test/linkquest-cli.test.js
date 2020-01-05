'use strict'

const chai = require('chai');
const path = require('path');
const fs = require('fs-extra');
const shell = require('shelljs');
const pkg = require('../package.json');

const output = path.resolve(process.cwd(), 'test');
const outputFile = `${output}/linkquest.json`;

describe('Getting the version of the program', () => {
  it('should print the correct version of the program using the short version -v', done => {
    const cmd = shell.exec('node bin/linkquest-cli -v', { async: true });

    cmd.stdout.on('data', data => {
      chai.expect(data).to.equal(pkg.version + '\n');

      done();
    });
  });

  it('should print the correct version of the program using the short version -v', done => {
    const cmd = shell.exec('node bin/linkquest-cli --version', { async: true });

    cmd.stdout.on('data', data => {
      chai.expect(data).to.equal(pkg.version + '\n');

      done();
    });
  });
});

describe('Getting valid and invalid links', () => {
  afterEach(function(done) {
    this.timeout(3000);

    fs.removeSync(outputFile);

    done();
  });

  it('should gather valid and invalid links and save them to a JSON file', function (done) {
    this.timeout(10000);

    shell.exec(`node bin/linkquest-cli -o ${output} http://example.com/`, { async: true });

    const expected = {
      validLinks: ["http://example.com/", "https://www.iana.org/domains/example"],
      invalidLinks: []
    };

    setTimeout(() => {
      const results = fs.readJSONSync(outputFile);

      chai.expect(results).to.deep.equal(expected);

      done();
    }, 7000);
  });
});