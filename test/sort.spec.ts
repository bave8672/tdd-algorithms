import { HeapSort } from '../src/algorithms/sorting/heapSort/heapSort';
import { MergeSort } from '../src/algorithms/sorting/mergeSort/mergeSort';
import { runSorterSpecs } from './sorterSpecs';

[MergeSort, HeapSort].forEach(runSorterSpecs);
