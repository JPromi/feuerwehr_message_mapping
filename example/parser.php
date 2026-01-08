<?php
//
// Example mapping function
//
// use:
// parse($alarmText, $regexJson);
//

function parse(string $line, array $cfg): array
{
    $out = [];

    foreach ($cfg['fields'] as $k => $d) {
        $flags = $cfg['flags'] ?? '';
        $pattern = '/' . $d['regex'] . '/' . $flags;

        if (!preg_match($pattern, $line, $m)) {
            $out[$k] = null;
            continue;
        }

        $v = ($k === 'object')
            ? ($m[1] ?? $m[2] ?? null)
            : ($m[1] ?? null);

        $v = is_string($v) ? trim($v) : null;

        if ($v === '' || $v === null) {
            $out[$k] = null;
            continue;
        }

        if (($d['type'] ?? null) === 'int') {
            $n = filter_var($v, FILTER_VALIDATE_INT);
            $out[$k] = ($n !== false) ? $n : null;
            continue;
        }

        if (($d['type'] ?? null) === 'float') {
            $v = str_replace(',', '.', $v);
            $n = filter_var($v, FILTER_VALIDATE_FLOAT);
            $out[$k] = ($n !== false) ? $n : null;
            continue;
        }

        $out[$k] = $v;
    }

    return $out;
}