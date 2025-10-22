import { expect } from 'chai';
import type { ScentHash } from './scent-hash.type';

describe('ScentHash type (runtime checks)', () => {
    // runtime "type guard" to validate shape at runtime
    const isScentHash = (v: unknown): v is ScentHash => {
        if (v === null || typeof v !== 'object') return false;
        for (const key of Object.keys(v as Record<string, unknown>)) {
            if (typeof key !== 'string') return false; // keys from Object.keys are strings, kept for clarity
            const val = (v as Record<string, unknown>)[key];
            if (typeof val !== 'string') return false;
        }
        return true;
    };

    it('allows an empty object', () => {
        const empty: ScentHash = {};
        expect(empty).to.be.an('object');
        expect(Object.keys(empty)).to.have.length(0);
        expect(isScentHash(empty)).to.equal(true);
    });

    it('stores and retrieves string values by string keys', () => {
        const scentHash: ScentHash = {};
        let key1 = `1:2`
        scentHash[key1] = ''
        scentHash[key1] = 'N'
        expect(scentHash[key1]).to.equal('N');
        expect(isScentHash(scentHash)).to.equal(true);
    });

    it('stores multiple entries correctly', () => {
        const scentHash: ScentHash = {};
        scentHash['0:0'] = 'N';
        scentHash['1:2'] = 'ES';
        scentHash['3:4'] = 'W';
        expect(scentHash['0:0']).to.equal('N');
        expect(scentHash['1:2']).to.equal('ES');
        expect(scentHash['3:4']).to.equal('W');
        expect(isScentHash(scentHash)).to.equal(true);
    });

});