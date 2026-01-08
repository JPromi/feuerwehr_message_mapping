class UnitTest {
    compileCfg(cfg) {
        const flags = cfg.flags ?? "";
        return {
            ...cfg,
            _compiled: Object.fromEntries(
            Object.entries(cfg.fields).map(([k, d]) => [
                k,
                { ...d, _re: new RegExp(d.regex, flags) },
            ])
            ),
        };
    }

    parse(line, cfg) {
        const fields = cfg._compiled ?? cfg.fields; // falls schon kompiliert
        const out = {};

        for (const [k, d] of Object.entries(fields)) {
            const re = d._re ?? new RegExp(d.regex, cfg.flags ?? "");
            const m = re.exec(line);

            let v = m ? (k === "object" ? (m[1] ?? m[2]) : m[1]) : null;
            v = v?.trim?.() || null;

            if (!v) {
            out[k] = null;
            continue;
            }

            if (d.type === "int") {
            const n = Number.parseInt(v, 10);
            out[k] = Number.isFinite(n) ? n : null;
            continue;
            }

            if (d.type === "float") {
            const n = Number.parseFloat(v.replace(",", "."));
            out[k] = Number.isFinite(n) ? n : null;
            continue;
            }

            out[k] = v;
        }

        return out;
    }

    run(configuration) {
        const fs = require('fs');
        const regex = JSON.parse(fs.readFileSync(`../integration/${configuration}.json`, 'utf8'));
        const compiledCfg = this.compileCfg(regex);
        const testData = JSON.parse(fs.readFileSync(`./data/${configuration}_test.json`, 'utf8'));
        let passed = 0;
        for (const [i, testCase] of testData.entries()) {
            const result = this.parse(testCase.text, compiledCfg);
            const expected = testCase.expected;
            const resultStr = JSON.stringify(result);
            const expectedStr = JSON.stringify(expected);
            if (resultStr === expectedStr) {
                console.log(`Test case ${i + 1}: PASSED`);
                passed++;
            } else {
                console.log(`Test case ${i + 1}: FAILED`);
                console.log(`  Input:    ${testCase.text}`);
                console.log(`  Expected: ${expectedStr}`);
                console.log(`  Got:      ${resultStr}`);
            }
        }
        console.log(`\n${passed} out of ${testData.length} test cases passed.`);
    }
}

const unitTest = new UnitTest();
unitTest.run('loweraustria');