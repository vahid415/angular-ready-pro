import { Subsystem } from '@app/core';
import menuItems from './pages-menu';

const subsystem = new Subsystem();
subsystem.id = 'SUBSYSTEM_1';
subsystem.icon = 'none';
subsystem.titleKey = 'TICKETING';
subsystem.menuItems = menuItems;
export default subsystem;
