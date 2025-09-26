import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import eSimData from '../../json/esimData.json';

export interface Price {
  price: string;
  validity: string;
}

export interface DataSize {
  size: string;
  prices: Price[];
}

export interface ESim {
  title: string;
  country: string;
  slug: string;
  regions: string;
  type: string;
  images: string[];
  dataSize: DataSize[];
}

interface ESimState {
  allESims: ESim[];
  filteredESims: ESim[];
  searchQuery: string;
  regionFilter: string;
  typeFilter: string;
}

const initialState: ESimState = {
  allESims: eSimData as ESim[],
  filteredESims: eSimData as ESim[],
  searchQuery: '',
  regionFilter: 'Semua Region',
  typeFilter: 'Semua Jenis',
};

export const eSimSlice = createSlice({
  name: 'eSim',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredESims = applyFilters(
        state.allESims,
        action.payload,
        state.regionFilter,
        state.typeFilter
      );
    },
    setRegionFilter: (state, action: PayloadAction<string>) => {
      state.regionFilter = action.payload;
      state.filteredESims = applyFilters(
        state.allESims,
        state.searchQuery,
        action.payload,
        state.typeFilter
      );
    },
    setJenisFilter: (state, action: PayloadAction<string>) => {
      state.typeFilter = action.payload;
      state.filteredESims = applyFilters(
        state.allESims,
        state.searchQuery,
        state.regionFilter,
        action.payload
      );
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.regionFilter = '';
      state.typeFilter = '';
      state.filteredESims = state.allESims;
    },
  },
});

// Helper function to apply all filters
function applyFilters(
  eSims: ESim[],
  searchQuery: string,
  regionFilter: string,
  jenisFilter: string
): ESim[] {
  return eSims.filter((eSim) => {
    const matchesSearch = eSim.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter === '' || eSim.regions.toLowerCase() === regionFilter.toLowerCase();
    const matchesJenis = jenisFilter === '' || eSim.type.toLowerCase() === jenisFilter.toLowerCase();

    return matchesSearch && matchesRegion && matchesJenis;
  });
}

export const { setSearchQuery, setRegionFilter, setJenisFilter, resetFilters } = eSimSlice.actions;

// Selector to get single eSIM data by slug
export const selectESimBySlug = (state: { eSim: ESimState }, slug: string): ESim | undefined => {
  return state.eSim.allESims.find((eSim) => eSim.slug === slug);
};

export default eSimSlice.reducer;