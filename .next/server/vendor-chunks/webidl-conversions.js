"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/webidl-conversions";
exports.ids = ["vendor-chunks/webidl-conversions"];
exports.modules = {

/***/ "(ssr)/./node_modules/webidl-conversions/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/webidl-conversions/lib/index.js ***!
  \******************************************************/
/***/ ((module) => {

eval("\nvar conversions = {};\nmodule.exports = conversions;\nfunction sign(x) {\n    return x < 0 ? -1 : 1;\n}\nfunction evenRound(x) {\n    // Round x to the nearest integer, choosing the even integer if it lies halfway between two.\n    if (x % 1 === 0.5 && (x & 1) === 0) {\n        return Math.floor(x);\n    } else {\n        return Math.round(x);\n    }\n}\nfunction createNumberConversion(bitLength, typeOpts) {\n    if (!typeOpts.unsigned) {\n        --bitLength;\n    }\n    const lowerBound = typeOpts.unsigned ? 0 : -Math.pow(2, bitLength);\n    const upperBound = Math.pow(2, bitLength) - 1;\n    const moduloVal = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength) : Math.pow(2, bitLength);\n    const moduloBound = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength - 1) : Math.pow(2, bitLength - 1);\n    return function(V, opts) {\n        if (!opts) opts = {};\n        let x = +V;\n        if (opts.enforceRange) {\n            if (!Number.isFinite(x)) {\n                throw new TypeError(\"Argument is not a finite number\");\n            }\n            x = sign(x) * Math.floor(Math.abs(x));\n            if (x < lowerBound || x > upperBound) {\n                throw new TypeError(\"Argument is not in byte range\");\n            }\n            return x;\n        }\n        if (!isNaN(x) && opts.clamp) {\n            x = evenRound(x);\n            if (x < lowerBound) x = lowerBound;\n            if (x > upperBound) x = upperBound;\n            return x;\n        }\n        if (!Number.isFinite(x) || x === 0) {\n            return 0;\n        }\n        x = sign(x) * Math.floor(Math.abs(x));\n        x = x % moduloVal;\n        if (!typeOpts.unsigned && x >= moduloBound) {\n            return x - moduloVal;\n        } else if (typeOpts.unsigned) {\n            if (x < 0) {\n                x += moduloVal;\n            } else if (x === -0) {\n                return 0;\n            }\n        }\n        return x;\n    };\n}\nconversions[\"void\"] = function() {\n    return undefined;\n};\nconversions[\"boolean\"] = function(val) {\n    return !!val;\n};\nconversions[\"byte\"] = createNumberConversion(8, {\n    unsigned: false\n});\nconversions[\"octet\"] = createNumberConversion(8, {\n    unsigned: true\n});\nconversions[\"short\"] = createNumberConversion(16, {\n    unsigned: false\n});\nconversions[\"unsigned short\"] = createNumberConversion(16, {\n    unsigned: true\n});\nconversions[\"long\"] = createNumberConversion(32, {\n    unsigned: false\n});\nconversions[\"unsigned long\"] = createNumberConversion(32, {\n    unsigned: true\n});\nconversions[\"long long\"] = createNumberConversion(32, {\n    unsigned: false,\n    moduloBitLength: 64\n});\nconversions[\"unsigned long long\"] = createNumberConversion(32, {\n    unsigned: true,\n    moduloBitLength: 64\n});\nconversions[\"double\"] = function(V) {\n    const x = +V;\n    if (!Number.isFinite(x)) {\n        throw new TypeError(\"Argument is not a finite floating-point value\");\n    }\n    return x;\n};\nconversions[\"unrestricted double\"] = function(V) {\n    const x = +V;\n    if (isNaN(x)) {\n        throw new TypeError(\"Argument is NaN\");\n    }\n    return x;\n};\n// not quite valid, but good enough for JS\nconversions[\"float\"] = conversions[\"double\"];\nconversions[\"unrestricted float\"] = conversions[\"unrestricted double\"];\nconversions[\"DOMString\"] = function(V, opts) {\n    if (!opts) opts = {};\n    if (opts.treatNullAsEmptyString && V === null) {\n        return \"\";\n    }\n    return String(V);\n};\nconversions[\"ByteString\"] = function(V, opts) {\n    const x = String(V);\n    let c = undefined;\n    for(let i = 0; (c = x.codePointAt(i)) !== undefined; ++i){\n        if (c > 255) {\n            throw new TypeError(\"Argument is not a valid bytestring\");\n        }\n    }\n    return x;\n};\nconversions[\"USVString\"] = function(V) {\n    const S = String(V);\n    const n = S.length;\n    const U = [];\n    for(let i = 0; i < n; ++i){\n        const c = S.charCodeAt(i);\n        if (c < 0xD800 || c > 0xDFFF) {\n            U.push(String.fromCodePoint(c));\n        } else if (0xDC00 <= c && c <= 0xDFFF) {\n            U.push(String.fromCodePoint(0xFFFD));\n        } else {\n            if (i === n - 1) {\n                U.push(String.fromCodePoint(0xFFFD));\n            } else {\n                const d = S.charCodeAt(i + 1);\n                if (0xDC00 <= d && d <= 0xDFFF) {\n                    const a = c & 0x3FF;\n                    const b = d & 0x3FF;\n                    U.push(String.fromCodePoint((2 << 15) + (2 << 9) * a + b));\n                    ++i;\n                } else {\n                    U.push(String.fromCodePoint(0xFFFD));\n                }\n            }\n        }\n    }\n    return U.join(\"\");\n};\nconversions[\"Date\"] = function(V, opts) {\n    if (!(V instanceof Date)) {\n        throw new TypeError(\"Argument is not a Date object\");\n    }\n    if (isNaN(V)) {\n        return undefined;\n    }\n    return V;\n};\nconversions[\"RegExp\"] = function(V, opts) {\n    if (!(V instanceof RegExp)) {\n        V = new RegExp(V);\n    }\n    return V;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2ViaWRsLWNvbnZlcnNpb25zL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUViLElBQUlBLGNBQWMsQ0FBQztBQUNuQkMsT0FBT0MsT0FBTyxHQUFHRjtBQUVqQixTQUFTRyxLQUFLQyxDQUFDO0lBQ1gsT0FBT0EsSUFBSSxJQUFJLENBQUMsSUFBSTtBQUN4QjtBQUVBLFNBQVNDLFVBQVVELENBQUM7SUFDaEIsNEZBQTRGO0lBQzVGLElBQUksSUFBSyxNQUFPLE9BQU8sQ0FBQ0EsSUFBSSxPQUFPLEdBQUc7UUFDbEMsT0FBT0UsS0FBS0MsS0FBSyxDQUFDSDtJQUN0QixPQUFPO1FBQ0gsT0FBT0UsS0FBS0UsS0FBSyxDQUFDSjtJQUN0QjtBQUNKO0FBRUEsU0FBU0ssdUJBQXVCQyxTQUFTLEVBQUVDLFFBQVE7SUFDL0MsSUFBSSxDQUFDQSxTQUFTQyxRQUFRLEVBQUU7UUFDcEIsRUFBRUY7SUFDTjtJQUNBLE1BQU1HLGFBQWFGLFNBQVNDLFFBQVEsR0FBRyxJQUFJLENBQUNOLEtBQUtRLEdBQUcsQ0FBQyxHQUFHSjtJQUN4RCxNQUFNSyxhQUFhVCxLQUFLUSxHQUFHLENBQUMsR0FBR0osYUFBYTtJQUU1QyxNQUFNTSxZQUFZTCxTQUFTTSxlQUFlLEdBQUdYLEtBQUtRLEdBQUcsQ0FBQyxHQUFHSCxTQUFTTSxlQUFlLElBQUlYLEtBQUtRLEdBQUcsQ0FBQyxHQUFHSjtJQUNqRyxNQUFNUSxjQUFjUCxTQUFTTSxlQUFlLEdBQUdYLEtBQUtRLEdBQUcsQ0FBQyxHQUFHSCxTQUFTTSxlQUFlLEdBQUcsS0FBS1gsS0FBS1EsR0FBRyxDQUFDLEdBQUdKLFlBQVk7SUFFbkgsT0FBTyxTQUFTUyxDQUFDLEVBQUVDLElBQUk7UUFDbkIsSUFBSSxDQUFDQSxNQUFNQSxPQUFPLENBQUM7UUFFbkIsSUFBSWhCLElBQUksQ0FBQ2U7UUFFVCxJQUFJQyxLQUFLQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDQyxPQUFPQyxRQUFR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QUlDO29CQUN2RCxFQUFFWDtnQkFDTixPQUFPO29CQUNISyxFQUFFRSxJQUFJLENBQUNULE9BQU9VLGFBQWEsQ0FBQztnQkFDaEM7WUFDSjtRQUNKO0lBQ0o7SUFFQSxPQUFPSCxFQUFFTyxJQUFJLENBQUM7QUFDbEI7QUFFQTdDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsU0FBVW1CLENBQUMsRUFBRUMsSUFBSTtJQUNuQyxJQUFJLENBQUVELENBQUFBLGFBQWEyQixJQUFHLEdBQUk7UUFDdEIsTUFBTSxJQUFJdEIsVUFBVTtJQUN4QjtJQUNBLElBQUlFLE1BQU1QLElBQUk7UUFDVixPQUFPUztJQUNYO0lBRUEsT0FBT1Q7QUFDWDtBQUVBbkIsV0FBVyxDQUFDLFNBQVMsR0FBRyxTQUFVbUIsQ0FBQyxFQUFFQyxJQUFJO0lBQ3JDLElBQUksQ0FBRUQsQ0FBQUEsYUFBYTRCLE1BQUssR0FBSTtRQUN4QjVCLElBQUksSUFBSTRCLE9BQU81QjtJQUNuQjtJQUVBLE9BQU9BO0FBQ1giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMtMTMtcmVwbGl0Ly4vbm9kZV9tb2R1bGVzL3dlYmlkbC1jb252ZXJzaW9ucy9saWIvaW5kZXguanM/MGY3NiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIGNvbnZlcnNpb25zID0ge307XG5tb2R1bGUuZXhwb3J0cyA9IGNvbnZlcnNpb25zO1xuXG5mdW5jdGlvbiBzaWduKHgpIHtcbiAgICByZXR1cm4geCA8IDAgPyAtMSA6IDE7XG59XG5cbmZ1bmN0aW9uIGV2ZW5Sb3VuZCh4KSB7XG4gICAgLy8gUm91bmQgeCB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyLCBjaG9vc2luZyB0aGUgZXZlbiBpbnRlZ2VyIGlmIGl0IGxpZXMgaGFsZndheSBiZXR3ZWVuIHR3by5cbiAgICBpZiAoKHggJSAxKSA9PT0gMC41ICYmICh4ICYgMSkgPT09IDApIHsgLy8gW2V2ZW4gbnVtYmVyXS41OyByb3VuZCBkb3duIChpLmUuIGZsb29yKVxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh4KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU51bWJlckNvbnZlcnNpb24oYml0TGVuZ3RoLCB0eXBlT3B0cykge1xuICAgIGlmICghdHlwZU9wdHMudW5zaWduZWQpIHtcbiAgICAgICAgLS1iaXRMZW5ndGg7XG4gICAgfVxuICAgIGNvbnN0IGxvd2VyQm91bmQgPSB0eXBlT3B0cy51bnNpZ25lZCA/IDAgOiAtTWF0aC5wb3coMiwgYml0TGVuZ3RoKTtcbiAgICBjb25zdCB1cHBlckJvdW5kID0gTWF0aC5wb3coMiwgYml0TGVuZ3RoKSAtIDE7XG5cbiAgICBjb25zdCBtb2R1bG9WYWwgPSB0eXBlT3B0cy5tb2R1bG9CaXRMZW5ndGggPyBNYXRoLnBvdygyLCB0eXBlT3B0cy5tb2R1bG9CaXRMZW5ndGgpIDogTWF0aC5wb3coMiwgYml0TGVuZ3RoKTtcbiAgICBjb25zdCBtb2R1bG9Cb3VuZCA9IHR5cGVPcHRzLm1vZHVsb0JpdExlbmd0aCA/IE1hdGgucG93KDIsIHR5cGVPcHRzLm1vZHVsb0JpdExlbmd0aCAtIDEpIDogTWF0aC5wb3coMiwgYml0TGVuZ3RoIC0gMSk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oViwgb3B0cykge1xuICAgICAgICBpZiAoIW9wdHMpIG9wdHMgPSB7fTtcblxuICAgICAgICBsZXQgeCA9ICtWO1xuXG4gICAgICAgIGlmIChvcHRzLmVuZm9yY2VSYW5nZSkge1xuICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoeCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJndW1lbnQgaXMgbm90IGEgZmluaXRlIG51bWJlclwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgeCA9IHNpZ24oeCkgKiBNYXRoLmZsb29yKE1hdGguYWJzKHgpKTtcbiAgICAgICAgICAgIGlmICh4IDwgbG93ZXJCb3VuZCB8fCB4ID4gdXBwZXJCb3VuZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBpcyBub3QgaW4gYnl0ZSByYW5nZVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzTmFOKHgpICYmIG9wdHMuY2xhbXApIHtcbiAgICAgICAgICAgIHggPSBldmVuUm91bmQoeCk7XG5cbiAgICAgICAgICAgIGlmICh4IDwgbG93ZXJCb3VuZCkgeCA9IGxvd2VyQm91bmQ7XG4gICAgICAgICAgICBpZiAoeCA+IHVwcGVyQm91bmQpIHggPSB1cHBlckJvdW5kO1xuICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIU51bWJlci5pc0Zpbml0ZSh4KSB8fCB4ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHggPSBzaWduKHgpICogTWF0aC5mbG9vcihNYXRoLmFicyh4KSk7XG4gICAgICAgIHggPSB4ICUgbW9kdWxvVmFsO1xuXG4gICAgICAgIGlmICghdHlwZU9wdHMudW5zaWduZWQgJiYgeCA+PSBtb2R1bG9Cb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuIHggLSBtb2R1bG9WYWw7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZU9wdHMudW5zaWduZWQpIHtcbiAgICAgICAgICAgIGlmICh4IDwgMCkge1xuICAgICAgICAgICAgICB4ICs9IG1vZHVsb1ZhbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeCA9PT0gLTApIHsgLy8gZG9uJ3QgcmV0dXJuIG5lZ2F0aXZlIHplcm9cbiAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geDtcbiAgICB9XG59XG5cbmNvbnZlcnNpb25zW1widm9pZFwiXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuY29udmVyc2lvbnNbXCJib29sZWFuXCJdID0gZnVuY3Rpb24gKHZhbCkge1xuICAgIHJldHVybiAhIXZhbDtcbn07XG5cbmNvbnZlcnNpb25zW1wiYnl0ZVwiXSA9IGNyZWF0ZU51bWJlckNvbnZlcnNpb24oOCwgeyB1bnNpZ25lZDogZmFsc2UgfSk7XG5jb252ZXJzaW9uc1tcIm9jdGV0XCJdID0gY3JlYXRlTnVtYmVyQ29udmVyc2lvbig4LCB7IHVuc2lnbmVkOiB0cnVlIH0pO1xuXG5jb252ZXJzaW9uc1tcInNob3J0XCJdID0gY3JlYXRlTnVtYmVyQ29udmVyc2lvbigxNiwgeyB1bnNpZ25lZDogZmFsc2UgfSk7XG5jb252ZXJzaW9uc1tcInVuc2lnbmVkIHNob3J0XCJdID0gY3JlYXRlTnVtYmVyQ29udmVyc2lvbigxNiwgeyB1bnNpZ25lZDogdHJ1ZSB9KTtcblxuY29udmVyc2lvbnNbXCJsb25nXCJdID0gY3JlYXRlTnVtYmVyQ29udmVyc2lvbigzMiwgeyB1bnNpZ25lZDogZmFsc2UgfSk7XG5jb252ZXJzaW9uc1tcInVuc2lnbmVkIGxvbmdcIl0gPSBjcmVhdGVOdW1iZXJDb252ZXJzaW9uKDMyLCB7IHVuc2lnbmVkOiB0cnVlIH0pO1xuXG5jb252ZXJzaW9uc1tcImxvbmcgbG9uZ1wiXSA9IGNyZWF0ZU51bWJlckNvbnZlcnNpb24oMzIsIHsgdW5zaWduZWQ6IGZhbHNlLCBtb2R1bG9CaXRMZW5ndGg6IDY0IH0pO1xuY29udmVyc2lvbnNbXCJ1bnNpZ25lZCBsb25nIGxvbmdcIl0gPSBjcmVhdGVOdW1iZXJDb252ZXJzaW9uKDMyLCB7IHVuc2lnbmVkOiB0cnVlLCBtb2R1bG9CaXRMZW5ndGg6IDY0IH0pO1xuXG5jb252ZXJzaW9uc1tcImRvdWJsZVwiXSA9IGZ1bmN0aW9uIChWKSB7XG4gICAgY29uc3QgeCA9ICtWO1xuXG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoeCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50IGlzIG5vdCBhIGZpbml0ZSBmbG9hdGluZy1wb2ludCB2YWx1ZVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4geDtcbn07XG5cbmNvbnZlcnNpb25zW1widW5yZXN0cmljdGVkIGRvdWJsZVwiXSA9IGZ1bmN0aW9uIChWKSB7XG4gICAgY29uc3QgeCA9ICtWO1xuXG4gICAgaWYgKGlzTmFOKHgpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBpcyBOYU5cIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHg7XG59O1xuXG4vLyBub3QgcXVpdGUgdmFsaWQsIGJ1dCBnb29kIGVub3VnaCBmb3IgSlNcbmNvbnZlcnNpb25zW1wiZmxvYXRcIl0gPSBjb252ZXJzaW9uc1tcImRvdWJsZVwiXTtcbmNvbnZlcnNpb25zW1widW5yZXN0cmljdGVkIGZsb2F0XCJdID0gY29udmVyc2lvbnNbXCJ1bnJlc3RyaWN0ZWQgZG91YmxlXCJdO1xuXG5jb252ZXJzaW9uc1tcIkRPTVN0cmluZ1wiXSA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgaWYgKCFvcHRzKSBvcHRzID0ge307XG5cbiAgICBpZiAob3B0cy50cmVhdE51bGxBc0VtcHR5U3RyaW5nICYmIFYgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIFN0cmluZyhWKTtcbn07XG5cbmNvbnZlcnNpb25zW1wiQnl0ZVN0cmluZ1wiXSA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgY29uc3QgeCA9IFN0cmluZyhWKTtcbiAgICBsZXQgYyA9IHVuZGVmaW5lZDtcbiAgICBmb3IgKGxldCBpID0gMDsgKGMgPSB4LmNvZGVQb2ludEF0KGkpKSAhPT0gdW5kZWZpbmVkOyArK2kpIHtcbiAgICAgICAgaWYgKGMgPiAyNTUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBpcyBub3QgYSB2YWxpZCBieXRlc3RyaW5nXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHg7XG59O1xuXG5jb252ZXJzaW9uc1tcIlVTVlN0cmluZ1wiXSA9IGZ1bmN0aW9uIChWKSB7XG4gICAgY29uc3QgUyA9IFN0cmluZyhWKTtcbiAgICBjb25zdCBuID0gUy5sZW5ndGg7XG4gICAgY29uc3QgVSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGNvbnN0IGMgPSBTLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjIDwgMHhEODAwIHx8IGMgPiAweERGRkYpIHtcbiAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludChjKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoMHhEQzAwIDw9IGMgJiYgYyA8PSAweERGRkYpIHtcbiAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludCgweEZGRkQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpID09PSBuIC0gMSkge1xuICAgICAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludCgweEZGRkQpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZCA9IFMuY2hhckNvZGVBdChpICsgMSk7XG4gICAgICAgICAgICAgICAgaWYgKDB4REMwMCA8PSBkICYmIGQgPD0gMHhERkZGKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBjICYgMHgzRkY7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGIgPSBkICYgMHgzRkY7XG4gICAgICAgICAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludCgoMiA8PCAxNSkgKyAoMiA8PCA5KSAqIGEgKyBiKSk7XG4gICAgICAgICAgICAgICAgICAgICsraTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBVLnB1c2goU3RyaW5nLmZyb21Db2RlUG9pbnQoMHhGRkZEKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFUuam9pbignJyk7XG59O1xuXG5jb252ZXJzaW9uc1tcIkRhdGVcIl0gPSBmdW5jdGlvbiAoViwgb3B0cykge1xuICAgIGlmICghKFYgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJndW1lbnQgaXMgbm90IGEgRGF0ZSBvYmplY3RcIik7XG4gICAgfVxuICAgIGlmIChpc05hTihWKSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBWO1xufTtcblxuY29udmVyc2lvbnNbXCJSZWdFeHBcIl0gPSBmdW5jdGlvbiAoViwgb3B0cykge1xuICAgIGlmICghKFYgaW5zdGFuY2VvZiBSZWdFeHApKSB7XG4gICAgICAgIFYgPSBuZXcgUmVnRXhwKFYpO1xuICAgIH1cblxuICAgIHJldHVybiBWO1xufTtcbiJdLCJuYW1lcyI6WyJjb252ZXJzaW9ucyIsIm1vZHVsZSIsImV4cG9ydHMiLCJzaWduIiwieCIsImV2ZW5Sb3VuZCIsIk1hdGgiLCJmbG9vciIsInJvdW5kIiwiY3JlYXRlTnVtYmVyQ29udmVyc2lvbiIsImJpdExlbmd0aCIsInR5cGVPcHRzIiwidW5zaWduZWQiLCJsb3dlckJvdW5kIiwicG93IiwidXBwZXJCb3VuZCIsIm1vZHVsb1ZhbCIsIm1vZHVsb0JpdExlbmd0aCIsIm1vZHVsb0JvdW5kIiwiViIsIm9wdHMiLCJlbmZvcmNlUmFuZ2UiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsIlR5cGVFcnJvciIsImFicyIsImlzTmFOIiwiY2xhbXAiLCJ1bmRlZmluZWQiLCJ2YWwiLCJ0cmVhdE51bGxBc0VtcHR5U3RyaW5nIiwiU3RyaW5nIiwiYyIsImkiLCJjb2RlUG9pbnRBdCIsIlMiLCJuIiwibGVuZ3RoIiwiVSIsImNoYXJDb2RlQXQiLCJwdXNoIiwiZnJvbUNvZGVQb2ludCIsImQiLCJhIiwiYiIsImpvaW4iLCJEYXRlIiwiUmVnRXhwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/webidl-conversions/lib/index.js\n");

/***/ })

};
;