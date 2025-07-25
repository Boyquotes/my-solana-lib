
let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
const { TextDecoder, TextEncoder } = require(`util`);

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_2.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}
/**
 * @param {bigint} ref_price_price
 * @param {bigint} ref_price_conf
 * @param {number} ref_price_exponent
 * @param {bigint} collat_price_price
 * @param {bigint} collat_price_conf
 * @param {number} collat_price_exponent
 * @param {bigint} stake_pool_total_lamports
 * @param {bigint} stake_pool_pool_token_supply
 * @param {bigint} pool_params_price_factor_signif
 * @param {number} pool_params_price_factor_exp
 * @param {number} collat_mint_decimals
 * @param {number} synth_mint_decimals
 * @returns {number}
 */
module.exports.compute_collat_per_synth_price_exponent = function(ref_price_price, ref_price_conf, ref_price_exponent, collat_price_price, collat_price_conf, collat_price_exponent, stake_pool_total_lamports, stake_pool_pool_token_supply, pool_params_price_factor_signif, pool_params_price_factor_exp, collat_mint_decimals, synth_mint_decimals) {
    const ret = wasm.compute_collat_per_synth_price_exponent(ref_price_price, ref_price_conf, ref_price_exponent, collat_price_price, collat_price_conf, collat_price_exponent, stake_pool_total_lamports, stake_pool_pool_token_supply, pool_params_price_factor_signif, pool_params_price_factor_exp, collat_mint_decimals, synth_mint_decimals);
    return ret;
};

/**
 * @param {bigint} ref_price_price
 * @param {bigint} ref_price_conf
 * @param {number} ref_price_exponent
 * @param {bigint} collat_price_price
 * @param {bigint} collat_price_conf
 * @param {number} collat_price_exponent
 * @param {bigint} stake_pool_total_lamports
 * @param {bigint} stake_pool_pool_token_supply
 * @param {bigint} pool_params_price_factor_signif
 * @param {number} pool_params_price_factor_exp
 * @param {number} collat_mint_decimals
 * @param {number} synth_mint_decimals
 * @returns {bigint}
 */
module.exports.compute_collat_per_synth_price_conf = function(ref_price_price, ref_price_conf, ref_price_exponent, collat_price_price, collat_price_conf, collat_price_exponent, stake_pool_total_lamports, stake_pool_pool_token_supply, pool_params_price_factor_signif, pool_params_price_factor_exp, collat_mint_decimals, synth_mint_decimals) {
    const ret = wasm.compute_collat_per_synth_price_conf(ref_price_price, ref_price_conf, ref_price_exponent, collat_price_price, collat_price_conf, collat_price_exponent, stake_pool_total_lamports, stake_pool_pool_token_supply, pool_params_price_factor_signif, pool_params_price_factor_exp, collat_mint_decimals, synth_mint_decimals);
    return BigInt.asUintN(64, ret);
};

/**
 * @param {bigint} ref_price_price
 * @param {bigint} ref_price_conf
 * @param {number} ref_price_exponent
 * @param {bigint} collat_price_price
 * @param {bigint} collat_price_conf
 * @param {number} collat_price_exponent
 * @param {bigint} stake_pool_total_lamports
 * @param {bigint} stake_pool_pool_token_supply
 * @param {bigint} pool_params_price_factor_signif
 * @param {number} pool_params_price_factor_exp
 * @param {number} collat_mint_decimals
 * @param {number} synth_mint_decimals
 * @returns {bigint}
 */
module.exports.compute_collat_per_synth_price_mantissa = function(ref_price_price, ref_price_conf, ref_price_exponent, collat_price_price, collat_price_conf, collat_price_exponent, stake_pool_total_lamports, stake_pool_pool_token_supply, pool_params_price_factor_signif, pool_params_price_factor_exp, collat_mint_decimals, synth_mint_decimals) {
    const ret = wasm.compute_collat_per_synth_price_mantissa(ref_price_price, ref_price_conf, ref_price_exponent, collat_price_price, collat_price_conf, collat_price_exponent, stake_pool_total_lamports, stake_pool_pool_token_supply, pool_params_price_factor_signif, pool_params_price_factor_exp, collat_mint_decimals, synth_mint_decimals);
    return ret;
};

/**
 * @param {bigint} computed_pool_backing_capacity
 * @param {bigint} computed_pool_liabilities
 * @returns {bigint}
 */
module.exports.compute_pool_ur = function(computed_pool_backing_capacity, computed_pool_liabilities) {
    const ret = wasm.compute_pool_ur(computed_pool_backing_capacity, computed_pool_backing_capacity >> BigInt(64), computed_pool_liabilities, computed_pool_liabilities >> BigInt(64));
    return (BigInt.asUintN(64, ret[0]) | (ret[1] << BigInt(64)));
};

/**
 * @param {bigint} pool_state_total_realized_equity
 * @param {bigint} pool_state_shares
 * @param {bigint} computed_pool_equity
 * @returns {bigint}
 */
module.exports.compute_pnl_accum = function(pool_state_total_realized_equity, pool_state_shares, computed_pool_equity) {
    const ret = wasm.compute_pnl_accum(pool_state_total_realized_equity, pool_state_shares, pool_state_shares >> BigInt(64), computed_pool_equity, computed_pool_equity >> BigInt(64));
    return (BigInt.asUintN(64, ret[0]) | (ret[1] << BigInt(64)));
};

/**
 * @param {bigint} pool_state_shares
 * @param {bigint} pool_state_max_exposure_pct_fp9
 * @param {bigint} delta_shares
 * @param {number} vault_max_exposure_pct
 * @returns {bigint}
 */
module.exports.compute_updated_pool_max_exposure = function(pool_state_shares, pool_state_max_exposure_pct_fp9, delta_shares, vault_max_exposure_pct) {
    const ret = wasm.compute_updated_pool_max_exposure(pool_state_shares, pool_state_shares >> BigInt(64), pool_state_max_exposure_pct_fp9, delta_shares, delta_shares >> BigInt(64), vault_max_exposure_pct);
    return BigInt.asUintN(64, ret);
};

/**
 * @param {bigint} synth_amount
 * @param {bigint} collat_per_synth_price
 * @param {number} exponent
 * @returns {bigint}
 */
module.exports.compute_synth_to_collat_amount = function(synth_amount, collat_per_synth_price, exponent) {
    const ret = wasm.compute_synth_to_collat_amount(synth_amount, collat_per_synth_price, collat_per_synth_price >> BigInt(64), exponent);
    return BigInt.asUintN(64, ret);
};

/**
 * @param {bigint} price
 * @param {bigint} conf
 * @param {boolean} is_upper
 * @returns {bigint}
 */
module.exports.compute_bound_price_mantissa = function(price, conf, is_upper) {
    const ret = wasm.compute_bound_price_mantissa(price, conf, is_upper);
    return (BigInt.asUintN(64, ret[0]) | (ret[1] << BigInt(64)));
};

/**
 * @param {bigint} pool_state_lst_supply
 * @param {bigint} pool_state_stake_pool_lamports
 * @param {bigint} pool_collat_ata_amount
 * @param {bigint} stake_pool_total_lamports
 * @param {bigint} stake_pool_pool_token_supply
 * @returns {bigint}
 */
module.exports.compute_staking_rewards = function(pool_state_lst_supply, pool_state_stake_pool_lamports, pool_collat_ata_amount, stake_pool_total_lamports, stake_pool_pool_token_supply) {
    const ret = wasm.compute_staking_rewards(pool_state_lst_supply, pool_state_stake_pool_lamports, pool_collat_ata_amount, stake_pool_total_lamports, stake_pool_pool_token_supply);
    return BigInt.asUintN(64, ret);
};

/**
 * @param {bigint} pool_state_supply
 * @param {bigint} computed_pool_backable_synth
 * @returns {bigint}
 */
module.exports.compute_pool_mintable_synth = function(pool_state_supply, computed_pool_backable_synth) {
    const ret = wasm.compute_pool_mintable_synth(pool_state_supply, computed_pool_backable_synth, computed_pool_backable_synth >> BigInt(64));
    return (BigInt.asUintN(64, ret[0]) | (ret[1] << BigInt(64)));
};

/**
 * @param {bigint} computed_pool_backing_capacity
 * @param {bigint} computed_price_price
 * @param {bigint} computed_price_conf
 * @param {number} computed_price_exponent
 * @returns {bigint}
 */
module.exports.compute_pool_backable_synth = function(computed_pool_backing_capacity, computed_price_price, computed_price_conf, computed_price_exponent) {
    const ret = wasm.compute_pool_backable_synth(computed_pool_backing_capacity, computed_pool_backing_capacity >> BigInt(64), computed_price_price, computed_price_conf, computed_price_exponent);
    return (BigInt.asUintN(64, ret[0]) | (ret[1] << BigInt(64)));
};

/**
 * @param {bigint} computed_pool_equity
 * @param {bigint} pool_state_max_exposure_pct_fp9
 * @returns {bigint}
 */
module.exports.compute_pool_backing_capacity = function(computed_pool_equity, pool_state_max_exposure_pct_fp9) {
    const ret = wasm.compute_pool_backing_capacity(computed_pool_equity, computed_pool_equity >> BigInt(64), pool_state_max_exposure_pct_fp9);
    return (BigInt.asUintN(64, ret[0]) | (BigInt.asUintN(64, ret[1]) << BigInt(64)));
};

/**
 * @param {bigint} computed_pool_excess_collat
 * @param {bigint} computed_vault_equity
 * @returns {bigint}
 */
module.exports.compute_vault_withdrawable_collat = function(computed_pool_excess_collat, computed_vault_equity) {
    const ret = wasm.compute_vault_withdrawable_collat(computed_pool_excess_collat, computed_pool_excess_collat >> BigInt(64), computed_vault_equity, computed_vault_equity >> BigInt(64));
    return BigInt.asUintN(64, ret);
};

/**
 * @param {bigint} pool_collat_ata_amount
 * @param {bigint} pool_state_max_exposure_pct_fp9
 * @param {bigint} computed_pool_liabilities
 * @returns {bigint}
 */
module.exports.compute_pool_free_collat = function(pool_collat_ata_amount, pool_state_max_exposure_pct_fp9, computed_pool_liabilities) {
    const ret = wasm.compute_pool_free_collat(pool_collat_ata_amount, pool_state_max_exposure_pct_fp9, computed_pool_liabilities, computed_pool_liabilities >> BigInt(64));
    return (BigInt.asUintN(64, ret[0]) | (ret[1] << BigInt(64)));
};

/**
 * @param {bigint} vault_shares
 * @param {bigint} pool_state_shares
 * @param {bigint} computed_pool_liabilities
 * @param {bigint} computed_vault_equity
 * @returns {bigint}
 */
module.exports.compute_vault_cr = function(vault_shares, pool_state_shares, computed_pool_liabilities, computed_vault_equity) {
    const ret = wasm.compute_vault_cr(vault_shares, vault_shares >> BigInt(64), pool_state_shares, pool_state_shares >> BigInt(64), computed_pool_liabilities, computed_pool_liabilities >> BigInt(64), computed_vault_equity, computed_vault_equity >> BigInt(64));
    return (BigInt.asUintN(64, ret[0]) | (ret[1] << BigInt(64)));
};

/**
 * @param {bigint} vault_entry_equity
 * @param {bigint} computed_vault_pnl
 * @returns {bigint}
 */
module.exports.compute_vault_equity = function(vault_entry_equity, computed_vault_pnl) {
    const ret = wasm.compute_vault_equity(vault_entry_equity, computed_vault_pnl, computed_vault_pnl >> BigInt(64));
    return (BigInt.asUintN(64, ret[0]) | (ret[1] << BigInt(64)));
};

/**
 * @param {bigint} vault_shares
 * @param {bigint} vault_entry_pnl_accum
 * @param {bigint} computed_current_pnl_accum
 * @returns {bigint}
 */
module.exports.compute_vault_pnl = function(vault_shares, vault_entry_pnl_accum, computed_current_pnl_accum) {
    const ret = wasm.compute_vault_pnl(vault_shares, vault_shares >> BigInt(64), vault_entry_pnl_accum, vault_entry_pnl_accum >> BigInt(64), computed_current_pnl_accum, computed_current_pnl_accum >> BigInt(64));
    return (BigInt.asUintN(64, ret[0]) | (ret[1] << BigInt(64)));
};

/**
 * @param {bigint} pool_state_shares
 * @param {bigint} pool_state_total_realized_equity
 * @param {bigint} computed_pool_equity
 * @returns {bigint}
 */
module.exports.compute_current_pnl_accum = function(pool_state_shares, pool_state_total_realized_equity, computed_pool_equity) {
    const ret = wasm.compute_current_pnl_accum(pool_state_shares, pool_state_total_realized_equity, computed_pool_equity, computed_pool_equity >> BigInt(64));
    return (BigInt.asUintN(64, ret[0]) | (ret[1] << BigInt(64)));
};

/**
 * @param {bigint} pool_collat_ata_amount
 * @param {bigint} computed_pool_liabilities
 * @returns {bigint}
 */
module.exports.compute_pool_equity = function(pool_collat_ata_amount, computed_pool_liabilities) {
    const ret = wasm.compute_pool_equity(pool_collat_ata_amount, computed_pool_liabilities, computed_pool_liabilities >> BigInt(64));
    return (BigInt.asUintN(64, ret[0]) | (ret[1] << BigInt(64)));
};

/**
 * @param {bigint} pool_state_supply
 * @param {bigint} computed_price_price
 * @param {bigint} computed_price_conf
 * @param {number} computed_price_exponent
 * @returns {bigint}
 */
module.exports.compute_pool_liabilities = function(pool_state_supply, computed_price_price, computed_price_conf, computed_price_exponent) {
    const ret = wasm.compute_pool_liabilities(pool_state_supply, computed_price_price, computed_price_conf, computed_price_exponent);
    return (BigInt.asUintN(64, ret[0]) | (ret[1] << BigInt(64)));
};

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_2.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
 * Initialize Javascript logging and panic handler
 */
module.exports.solana_program_init = function() {
    wasm.solana_program_init();
};

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

const HashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hash_free(ptr >>> 0, 1));
/**
 * A hash; the 32-byte output of a hashing algorithm.
 *
 * This struct is used most often in `solana-sdk` and related crates to contain
 * a [SHA-256] hash, but may instead contain a [blake3] hash.
 *
 * [SHA-256]: https://en.wikipedia.org/wiki/SHA-2
 * [blake3]: https://github.com/BLAKE3-team/BLAKE3
 */
class Hash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Hash.prototype);
        obj.__wbg_ptr = ptr;
        HashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HashFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hash_free(ptr, 0);
    }
    /**
     * Create a new Hash object
     *
     * * `value` - optional hash as a base58 encoded string, `Uint8Array`, `[number]`
     * @param {any} value
     */
    constructor(value) {
        const ret = wasm.hash_constructor(value);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        HashFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Return the base58 string representation of the hash
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hash_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Checks if two `Hash`s are equal
     * @param {Hash} other
     * @returns {boolean}
     */
    equals(other) {
        _assertClass(other, Hash);
        const ret = wasm.hash_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Return the `Uint8Array` representation of the hash
     * @returns {Uint8Array}
     */
    toBytes() {
        const ret = wasm.hash_toBytes(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
module.exports.Hash = Hash;

const InstructionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_instruction_free(ptr >>> 0, 1));
/**
 * wasm-bindgen version of the Instruction struct.
 * This duplication is required until https://github.com/rustwasm/wasm-bindgen/issues/3671
 * is fixed. This must not diverge from the regular non-wasm Instruction struct.
 */
class Instruction {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Instruction.prototype);
        obj.__wbg_ptr = ptr;
        InstructionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        InstructionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_instruction_free(ptr, 0);
    }
}
module.exports.Instruction = Instruction;

const InstructionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_instructions_free(ptr >>> 0, 1));

class Instructions {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        InstructionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_instructions_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.instructions_constructor();
        this.__wbg_ptr = ret >>> 0;
        InstructionsFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {Instruction} instruction
     */
    push(instruction) {
        _assertClass(instruction, Instruction);
        var ptr0 = instruction.__destroy_into_raw();
        wasm.instructions_push(this.__wbg_ptr, ptr0);
    }
}
module.exports.Instructions = Instructions;

const MessageFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_message_free(ptr >>> 0, 1));
/**
 * wasm-bindgen version of the Message struct.
 * This duplication is required until https://github.com/rustwasm/wasm-bindgen/issues/3671
 * is fixed. This must not diverge from the regular non-wasm Message struct.
 */
class Message {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MessageFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_message_free(ptr, 0);
    }
    /**
     * The id of a recent ledger entry.
     * @returns {Hash}
     */
    get recent_blockhash() {
        const ret = wasm.__wbg_get_message_recent_blockhash(this.__wbg_ptr);
        return Hash.__wrap(ret);
    }
    /**
     * The id of a recent ledger entry.
     * @param {Hash} arg0
     */
    set recent_blockhash(arg0) {
        _assertClass(arg0, Hash);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_message_recent_blockhash(this.__wbg_ptr, ptr0);
    }
}
module.exports.Message = Message;

const PubkeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pubkey_free(ptr >>> 0, 1));
/**
 * The address of a [Solana account][acc].
 *
 * Some account addresses are [ed25519] public keys, with corresponding secret
 * keys that are managed off-chain. Often, though, account addresses do not
 * have corresponding secret keys &mdash; as with [_program derived
 * addresses_][pdas] &mdash; or the secret key is not relevant to the operation
 * of a program, and may have even been disposed of. As running Solana programs
 * can not safely create or manage secret keys, the full [`Keypair`] is not
 * defined in `solana-program` but in `solana-sdk`.
 *
 * [acc]: https://solana.com/docs/core/accounts
 * [ed25519]: https://ed25519.cr.yp.to/
 * [pdas]: https://solana.com/docs/core/cpi#program-derived-addresses
 * [`Keypair`]: https://docs.rs/solana-sdk/latest/solana_sdk/signer/keypair/struct.Keypair.html
 */
class Pubkey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Pubkey.prototype);
        obj.__wbg_ptr = ptr;
        PubkeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PubkeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pubkey_free(ptr, 0);
    }
    /**
     * Create a new Pubkey object
     *
     * * `value` - optional public key as a base58 encoded string, `Uint8Array`, `[number]`
     * @param {any} value
     */
    constructor(value) {
        const ret = wasm.pubkey_constructor(value);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        PubkeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Return the base58 string representation of the public key
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.pubkey_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Check if a `Pubkey` is on the ed25519 curve.
     * @returns {boolean}
     */
    isOnCurve() {
        const ret = wasm.pubkey_isOnCurve(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Checks if two `Pubkey`s are equal
     * @param {Pubkey} other
     * @returns {boolean}
     */
    equals(other) {
        _assertClass(other, Pubkey);
        const ret = wasm.hash_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Return the `Uint8Array` representation of the public key
     * @returns {Uint8Array}
     */
    toBytes() {
        const ret = wasm.pubkey_toBytes(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Derive a Pubkey from another Pubkey, string seed, and a program id
     * @param {Pubkey} base
     * @param {string} seed
     * @param {Pubkey} owner
     * @returns {Pubkey}
     */
    static createWithSeed(base, seed, owner) {
        _assertClass(base, Pubkey);
        const ptr0 = passStringToWasm0(seed, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(owner, Pubkey);
        const ret = wasm.pubkey_createWithSeed(base.__wbg_ptr, ptr0, len0, owner.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Pubkey.__wrap(ret[0]);
    }
    /**
     * Derive a program address from seeds and a program id
     * @param {any[]} seeds
     * @param {Pubkey} program_id
     * @returns {Pubkey}
     */
    static createProgramAddress(seeds, program_id) {
        const ptr0 = passArrayJsValueToWasm0(seeds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(program_id, Pubkey);
        const ret = wasm.pubkey_createProgramAddress(ptr0, len0, program_id.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Pubkey.__wrap(ret[0]);
    }
    /**
     * Find a valid program address
     *
     * Returns:
     * * `[PubKey, number]` - the program address and bump seed
     * @param {any[]} seeds
     * @param {Pubkey} program_id
     * @returns {any}
     */
    static findProgramAddress(seeds, program_id) {
        const ptr0 = passArrayJsValueToWasm0(seeds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(program_id, Pubkey);
        const ret = wasm.pubkey_findProgramAddress(ptr0, len0, program_id.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
}
module.exports.Pubkey = Pubkey;

const SystemInstructionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_systeminstruction_free(ptr >>> 0, 1));

class SystemInstruction {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SystemInstructionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_systeminstruction_free(ptr, 0);
    }
    /**
     * @param {Pubkey} from_pubkey
     * @param {Pubkey} to_pubkey
     * @param {bigint} lamports
     * @param {bigint} space
     * @param {Pubkey} owner
     * @returns {Instruction}
     */
    static createAccount(from_pubkey, to_pubkey, lamports, space, owner) {
        _assertClass(from_pubkey, Pubkey);
        _assertClass(to_pubkey, Pubkey);
        _assertClass(owner, Pubkey);
        const ret = wasm.systeminstruction_createAccount(from_pubkey.__wbg_ptr, to_pubkey.__wbg_ptr, lamports, space, owner.__wbg_ptr);
        return Instruction.__wrap(ret);
    }
    /**
     * @param {Pubkey} from_pubkey
     * @param {Pubkey} to_pubkey
     * @param {Pubkey} base
     * @param {string} seed
     * @param {bigint} lamports
     * @param {bigint} space
     * @param {Pubkey} owner
     * @returns {Instruction}
     */
    static createAccountWithSeed(from_pubkey, to_pubkey, base, seed, lamports, space, owner) {
        _assertClass(from_pubkey, Pubkey);
        _assertClass(to_pubkey, Pubkey);
        _assertClass(base, Pubkey);
        const ptr0 = passStringToWasm0(seed, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(owner, Pubkey);
        const ret = wasm.systeminstruction_createAccountWithSeed(from_pubkey.__wbg_ptr, to_pubkey.__wbg_ptr, base.__wbg_ptr, ptr0, len0, lamports, space, owner.__wbg_ptr);
        return Instruction.__wrap(ret);
    }
    /**
     * @param {Pubkey} pubkey
     * @param {Pubkey} owner
     * @returns {Instruction}
     */
    static assign(pubkey, owner) {
        _assertClass(pubkey, Pubkey);
        _assertClass(owner, Pubkey);
        const ret = wasm.systeminstruction_assign(pubkey.__wbg_ptr, owner.__wbg_ptr);
        return Instruction.__wrap(ret);
    }
    /**
     * @param {Pubkey} pubkey
     * @param {Pubkey} base
     * @param {string} seed
     * @param {Pubkey} owner
     * @returns {Instruction}
     */
    static assignWithSeed(pubkey, base, seed, owner) {
        _assertClass(pubkey, Pubkey);
        _assertClass(base, Pubkey);
        const ptr0 = passStringToWasm0(seed, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(owner, Pubkey);
        const ret = wasm.systeminstruction_assignWithSeed(pubkey.__wbg_ptr, base.__wbg_ptr, ptr0, len0, owner.__wbg_ptr);
        return Instruction.__wrap(ret);
    }
    /**
     * @param {Pubkey} from_pubkey
     * @param {Pubkey} to_pubkey
     * @param {bigint} lamports
     * @returns {Instruction}
     */
    static transfer(from_pubkey, to_pubkey, lamports) {
        _assertClass(from_pubkey, Pubkey);
        _assertClass(to_pubkey, Pubkey);
        const ret = wasm.systeminstruction_transfer(from_pubkey.__wbg_ptr, to_pubkey.__wbg_ptr, lamports);
        return Instruction.__wrap(ret);
    }
    /**
     * @param {Pubkey} from_pubkey
     * @param {Pubkey} from_base
     * @param {string} from_seed
     * @param {Pubkey} from_owner
     * @param {Pubkey} to_pubkey
     * @param {bigint} lamports
     * @returns {Instruction}
     */
    static transferWithSeed(from_pubkey, from_base, from_seed, from_owner, to_pubkey, lamports) {
        _assertClass(from_pubkey, Pubkey);
        _assertClass(from_base, Pubkey);
        const ptr0 = passStringToWasm0(from_seed, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(from_owner, Pubkey);
        _assertClass(to_pubkey, Pubkey);
        const ret = wasm.systeminstruction_transferWithSeed(from_pubkey.__wbg_ptr, from_base.__wbg_ptr, ptr0, len0, from_owner.__wbg_ptr, to_pubkey.__wbg_ptr, lamports);
        return Instruction.__wrap(ret);
    }
    /**
     * @param {Pubkey} pubkey
     * @param {bigint} space
     * @returns {Instruction}
     */
    static allocate(pubkey, space) {
        _assertClass(pubkey, Pubkey);
        const ret = wasm.systeminstruction_allocate(pubkey.__wbg_ptr, space);
        return Instruction.__wrap(ret);
    }
    /**
     * @param {Pubkey} address
     * @param {Pubkey} base
     * @param {string} seed
     * @param {bigint} space
     * @param {Pubkey} owner
     * @returns {Instruction}
     */
    static allocateWithSeed(address, base, seed, space, owner) {
        _assertClass(address, Pubkey);
        _assertClass(base, Pubkey);
        const ptr0 = passStringToWasm0(seed, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(owner, Pubkey);
        const ret = wasm.systeminstruction_allocateWithSeed(address.__wbg_ptr, base.__wbg_ptr, ptr0, len0, space, owner.__wbg_ptr);
        return Instruction.__wrap(ret);
    }
    /**
     * @param {Pubkey} from_pubkey
     * @param {Pubkey} nonce_pubkey
     * @param {Pubkey} authority
     * @param {bigint} lamports
     * @returns {Array<any>}
     */
    static createNonceAccount(from_pubkey, nonce_pubkey, authority, lamports) {
        _assertClass(from_pubkey, Pubkey);
        _assertClass(nonce_pubkey, Pubkey);
        _assertClass(authority, Pubkey);
        const ret = wasm.systeminstruction_createNonceAccount(from_pubkey.__wbg_ptr, nonce_pubkey.__wbg_ptr, authority.__wbg_ptr, lamports);
        return ret;
    }
    /**
     * @param {Pubkey} nonce_pubkey
     * @param {Pubkey} authorized_pubkey
     * @returns {Instruction}
     */
    static advanceNonceAccount(nonce_pubkey, authorized_pubkey) {
        _assertClass(nonce_pubkey, Pubkey);
        _assertClass(authorized_pubkey, Pubkey);
        const ret = wasm.systeminstruction_advanceNonceAccount(nonce_pubkey.__wbg_ptr, authorized_pubkey.__wbg_ptr);
        return Instruction.__wrap(ret);
    }
    /**
     * @param {Pubkey} nonce_pubkey
     * @param {Pubkey} authorized_pubkey
     * @param {Pubkey} to_pubkey
     * @param {bigint} lamports
     * @returns {Instruction}
     */
    static withdrawNonceAccount(nonce_pubkey, authorized_pubkey, to_pubkey, lamports) {
        _assertClass(nonce_pubkey, Pubkey);
        _assertClass(authorized_pubkey, Pubkey);
        _assertClass(to_pubkey, Pubkey);
        const ret = wasm.systeminstruction_withdrawNonceAccount(nonce_pubkey.__wbg_ptr, authorized_pubkey.__wbg_ptr, to_pubkey.__wbg_ptr, lamports);
        return Instruction.__wrap(ret);
    }
    /**
     * @param {Pubkey} nonce_pubkey
     * @param {Pubkey} authorized_pubkey
     * @param {Pubkey} new_authority
     * @returns {Instruction}
     */
    static authorizeNonceAccount(nonce_pubkey, authorized_pubkey, new_authority) {
        _assertClass(nonce_pubkey, Pubkey);
        _assertClass(authorized_pubkey, Pubkey);
        _assertClass(new_authority, Pubkey);
        const ret = wasm.systeminstruction_authorizeNonceAccount(nonce_pubkey.__wbg_ptr, authorized_pubkey.__wbg_ptr, new_authority.__wbg_ptr);
        return Instruction.__wrap(ret);
    }
}
module.exports.SystemInstruction = SystemInstruction;

module.exports.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
    const ret = arg0.buffer;
    return ret;
};

module.exports.__wbg_call_672a4d21634d4a24 = function() { return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
}, arguments) };

module.exports.__wbg_done_769e5ede4b31c67b = function(arg0) {
    const ret = arg0.done;
    return ret;
};

module.exports.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
};

module.exports.__wbg_get_67b2ba62fc30de12 = function() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(arg0, arg1);
    return ret;
}, arguments) };

module.exports.__wbg_instanceof_Uint8Array_17156bcf118086a9 = function(arg0) {
    let result;
    try {
        result = arg0 instanceof Uint8Array;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

module.exports.__wbg_instruction_new = function(arg0) {
    const ret = Instruction.__wrap(arg0);
    return ret;
};

module.exports.__wbg_isArray_a1eab7e0d067391b = function(arg0) {
    const ret = Array.isArray(arg0);
    return ret;
};

module.exports.__wbg_iterator_9a24c88df860dc65 = function() {
    const ret = Symbol.iterator;
    return ret;
};

module.exports.__wbg_length_a446193dc22c12f8 = function(arg0) {
    const ret = arg0.length;
    return ret;
};

module.exports.__wbg_new_78feb108b6472713 = function() {
    const ret = new Array();
    return ret;
};

module.exports.__wbg_new_8a6f238a6ece86ea = function() {
    const ret = new Error();
    return ret;
};

module.exports.__wbg_new_a12002a7f91c75be = function(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
};

module.exports.__wbg_newwithlength_c4c419ef0bc8a1f8 = function(arg0) {
    const ret = new Array(arg0 >>> 0);
    return ret;
};

module.exports.__wbg_next_25feadfc0913fea9 = function(arg0) {
    const ret = arg0.next;
    return ret;
};

module.exports.__wbg_next_6574e1a8a62d1055 = function() { return handleError(function (arg0) {
    const ret = arg0.next();
    return ret;
}, arguments) };

module.exports.__wbg_pubkey_new = function(arg0) {
    const ret = Pubkey.__wrap(arg0);
    return ret;
};

module.exports.__wbg_push_737cfc8c1432c2c6 = function(arg0, arg1) {
    const ret = arg0.push(arg1);
    return ret;
};

module.exports.__wbg_set_37837023f3d740e8 = function(arg0, arg1, arg2) {
    arg0[arg1 >>> 0] = arg2;
};

module.exports.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
};

module.exports.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
    const ret = arg1.stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

module.exports.__wbg_value_cd1ffa7b1ab794f1 = function(arg0) {
    const ret = arg0.value;
    return ret;
};

module.exports.__wbg_values_99f7a68c7f313d66 = function(arg0) {
    const ret = arg0.values();
    return ret;
};

module.exports.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

module.exports.__wbindgen_init_externref_table = function() {
    const table = wasm.__wbindgen_export_2;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

module.exports.__wbindgen_is_function = function(arg0) {
    const ret = typeof(arg0) === 'function';
    return ret;
};

module.exports.__wbindgen_is_object = function(arg0) {
    const val = arg0;
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

module.exports.__wbindgen_is_undefined = function(arg0) {
    const ret = arg0 === undefined;
    return ret;
};

module.exports.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return ret;
};

module.exports.__wbindgen_number_get = function(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
};

module.exports.__wbindgen_number_new = function(arg0) {
    const ret = arg0;
    return ret;
};

module.exports.__wbindgen_string_get = function(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

module.exports.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
};

module.exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

const path = require('path').join(__dirname, 'cybergold_wasm_bg.wasm');
const bytes = require('fs').readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;

wasm.__wbindgen_start();

